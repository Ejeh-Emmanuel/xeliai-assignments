import { useState } from "react";

function Pagination({
  page,
  setPage,
}) {
  return (
    <div>
      <button
        onClick={() =>
          setPage(page - 1)
        }
        disabled={page === 1}
      >
        Previous
      </button>

      <span>{page}</span>

      <button
        onClick={() =>
          setPage(page + 1)
        }
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;