export default async function Home() {
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight min-w-72">
          Overview
        </p>
      </div>
      <h3 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Upcoming
      </h3>
      <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2 justify-between">
        <div className="flex items-center gap-4">
          <div
            className="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-12"
            data-icon="VideoCamera"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M251.77,73a8,8,0,0,0-8.21.39L208,97.05V72a16,16,0,0,0-16-16H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V159l35.56,23.71A8,8,0,0,0,248,184a8,8,0,0,0,8-8V80A8,8,0,0,0,251.77,73ZM192,184H32V72H192V184Zm48-22.95-32-21.33V116.28L240,95Z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#0e141b] text-base font-medium leading-normal line-clamp-1">
              Q4 Kickoff
            </p>
            <p className="text-[#4e7397] text-sm font-normal leading-normal line-clamp-2">
              Oct 20, 2023
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <div
            className="text-[#0e141b] flex size-7 items-center justify-center"
            data-icon="DotsThree"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2 justify-between">
        <div className="flex items-center gap-4">
          <div
            className="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-12"
            data-icon="VideoCamera"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M251.77,73a8,8,0,0,0-8.21.39L208,97.05V72a16,16,0,0,0-16-16H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V159l35.56,23.71A8,8,0,0,0,248,184a8,8,0,0,0,8-8V80A8,8,0,0,0,251.77,73ZM192,184H32V72H192V184Zm48-22.95-32-21.33V116.28L240,95Z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#0e141b] text-base font-medium leading-normal line-clamp-1">
              Q4 OKRs
            </p>
            <p className="text-[#4e7397] text-sm font-normal leading-normal line-clamp-2">
              Nov 2, 2023
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <div
            className="text-[#0e141b] flex size-7 items-center justify-center"
            data-icon="DotsThree"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <h3 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Outstanding Action Items
      </h3>
      <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2 justify-between">
        <div className="flex items-center gap-4">
          <div
            className="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-12"
            data-icon="List"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#0e141b] text-base font-medium leading-normal line-clamp-1">
              Update company values
            </p>
            <p className="text-[#4e7397] text-sm font-normal leading-normal line-clamp-2">
              Due Oct 31, 2023
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <div
            className="text-[#0e141b] flex size-7 items-center justify-center"
            data-icon="DotsThree"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2 justify-between">
        <div className="flex items-center gap-4">
          <div
            className="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-12"
            data-icon="List"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#0e141b] text-base font-medium leading-normal line-clamp-1">
              Hire a new designer
            </p>
            <p className="text-[#4e7397] text-sm font-normal leading-normal line-clamp-2">
              Due Nov 15, 2023
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <div
            className="text-[#0e141b] flex size-7 items-center justify-center"
            data-icon="DotsThree"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
