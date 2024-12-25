export interface IPaginationProps {
  currentPage: number;
  onpageChange: (page: number) => void;
  totalPages: number;
}
