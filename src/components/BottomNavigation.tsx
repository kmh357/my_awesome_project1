/**
 * 하단 네비게이션 바 컴포넌트
 * 할 일 목록과 스티커 모음판 페이지를 전환합니다.
 */

import { Link, useLocation } from 'react-router-dom';

export default function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      icon: '📝',
      label: '할 일',
    },
    {
      path: '/collection',
      icon: '🎨',
      label: '스티커',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-30">
      <div className="max-w-4xl mx-auto flex">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex-1 flex flex-col items-center justify-center py-3 px-4
                transition-all duration-200
                ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-gray-500 hover:text-primary'
                }
              `}
            >
              <div
                className={`
                  text-3xl mb-1 transition-transform duration-200
                  ${isActive ? 'scale-110' : 'scale-100'}
                `}
              >
                {item.icon}
              </div>
              <span className="text-kid-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
