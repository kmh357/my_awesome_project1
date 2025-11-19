/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 찍찍이 앱 색상 팔레트 (파스텔톤)
        primary: {
          light: '#A7C7E7',  // 밝은 파스텔 블루
          DEFAULT: '#6B9BD1', // 기본 파스텔 블루
          dark: '#4A7BA7',   // 진한 파스텔 블루
        },
        secondary: {
          light: '#FFE5D9',  // 밝은 파스텔 핑크
          DEFAULT: '#FFB3BA', // 기본 파스텔 핑크
          dark: '#FF8FA3',   // 진한 파스텔 핑크
        },
        accent: {
          yellow: '#FFFACD', // 파스텔 옐로우
          green: '#B2F7EF',  // 파스텔 그린
          purple: '#E0BBE4', // 파스텔 퍼플
          orange: '#FFD8BE', // 파스텔 오렌지
        },
        success: '#B2F7EF',
        warning: '#FFD8BE',
        error: '#FFB3BA',
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      fontSize: {
        'kid-sm': '1rem',   // 16px - 초등학생 최소 크기
        'kid-base': '1.125rem', // 18px - 기본 크기
        'kid-lg': '1.25rem',  // 20px - 큰 글씨
        'kid-xl': '1.5rem',   // 24px - 제목
        'kid-2xl': '2rem',    // 32px - 큰 제목
      },
    },
  },
  plugins: [],
}
