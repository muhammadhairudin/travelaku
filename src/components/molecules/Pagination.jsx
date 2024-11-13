import PropTypes from 'prop-types';
import { Button } from '../atoms';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Fungsi untuk mendapatkan array halaman yang akan ditampilkan
  const getPageNumbers = () => {
    if (totalPages <= 3) {
      // Jika total halaman 3 atau kurang, tampilkan semua
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Jika halaman saat ini di awal
      if (currentPage <= 2) {
        return [1, 2, 3];
      }
      // Jika halaman saat ini di akhir
      if (currentPage >= totalPages - 1) {
        return [totalPages - 2, totalPages - 1, totalPages];
      }
      // Jika halaman saat ini di tengah
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const pages = getPageNumbers();

  return (
    <div className="flex gap-2">
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {/* Page numbers */}
      {pages.map(page => (
        <Button
          key={page}
          variant={currentPage === page ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {/* Ellipsis and last page if needed */}
      {currentPage < totalPages - 2 && (
        <>
          <span className="px-2 flex items-center">...</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination; 