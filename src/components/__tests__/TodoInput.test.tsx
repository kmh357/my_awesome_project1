/**
 * TodoInput 컴포넌트 테스트
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoInput from '../TodoInput';

describe('TodoInput', () => {
  it('입력 필드와 추가 버튼을 렌더링한다', () => {
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);

    expect(screen.getByPlaceholderText(/예: 수학 숙제하기/)).toBeInTheDocument();
    expect(screen.getByText('추가')).toBeInTheDocument();
  });

  it('글자 수 카운터를 표시한다', () => {
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} maxLength={50} />);

    expect(screen.getByText('0/50')).toBeInTheDocument();
  });

  it('텍스트 입력 시 글자 수가 업데이트된다', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} maxLength={50} />);

    const input = screen.getByPlaceholderText(/예: 수학 숙제하기/);
    await user.type(input, '수학 숙제');

    expect(screen.getByText('5/50')).toBeInTheDocument();
  });

  it('빈 입력 시 추가 버튼이 비활성화된다', () => {
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);

    const button = screen.getByText('추가');
    expect(button).toBeDisabled();
  });

  it('텍스트 입력 시 추가 버튼이 활성화된다', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/예: 수학 숙제하기/);
    await user.type(input, '할 일');

    const button = screen.getByText('추가');
    expect(button).not.toBeDisabled();
  });

  it('추가 버튼 클릭 시 onAdd 콜백이 호출된다', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/예: 수학 숙제하기/);
    await user.type(input, '수학 숙제');

    const button = screen.getByText('추가');
    await user.click(button);

    expect(onAdd).toHaveBeenCalledWith('수학 숙제');
  });

  it('Enter 키 입력 시 onAdd 콜백이 호출된다', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/예: 수학 숙제하기/);
    await user.type(input, '영어 단어{Enter}');

    expect(onAdd).toHaveBeenCalledWith('영어 단어');
  });

  it('추가 후 입력 필드가 초기화된다', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/예: 수학 숙제하기/) as HTMLInputElement;
    await user.type(input, '할 일');

    const button = screen.getByText('추가');
    await user.click(button);

    expect(input.value).toBe('');
  });

  it('빈 문자열 제출 시 에러 메시지를 표시한다', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/예: 수학 숙제하기/);
    await user.type(input, '   '); // 공백만 입력

    const button = screen.getByText('추가');
    fireEvent.click(button); // 비활성화된 버튼이므로 fireEvent 사용

    // form submit 직접 트리거
    const form = button.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    expect(screen.getByText('할 일을 입력해주세요!')).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('최대 길이 초과 시 에러 메시지를 표시한다', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} maxLength={10} />);

    const input = screen.getByPlaceholderText(/예: 수학 숙제하기/);
    await user.type(input, '12345678901'); // 11자

    const button = screen.getByText('추가');
    await user.click(button);

    expect(screen.getByText(/할 일은 최대 10자까지 입력할 수 있어요!/)).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('최대 길이 초과 시 글자 수가 빨간색으로 표시된다', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} maxLength={10} />);

    const input = screen.getByPlaceholderText(/예: 수학 숙제하기/);
    await user.type(input, '12345678901'); // 11자

    const counter = screen.getByText('11/10');
    expect(counter).toHaveClass('text-red-500');
  });

  it('앞뒤 공백을 제거하고 추가한다', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/예: 수학 숙제하기/);
    await user.type(input, '  할 일  ');

    const button = screen.getByText('추가');
    await user.click(button);

    expect(onAdd).toHaveBeenCalledWith('할 일');
  });

  it('에러 발생 후 입력 시 에러가 사라진다', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} maxLength={5} />);

    const input = screen.getByPlaceholderText(/예: 수학 숙제하기/);
    await user.type(input, '123456'); // 6자

    const button = screen.getByText('추가');
    await user.click(button);

    expect(screen.getByText(/할 일은 최대 5자까지 입력할 수 있어요!/)).toBeInTheDocument();

    // 입력 수정
    await user.clear(input);
    await user.type(input, '12345');

    expect(screen.queryByText(/할 일은 최대 5자까지 입력할 수 있어요!/)).not.toBeInTheDocument();
  });

  it('커스텀 maxLength를 설정할 수 있다', () => {
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} maxLength={100} />);

    expect(screen.getByText('0/100')).toBeInTheDocument();
  });
});
