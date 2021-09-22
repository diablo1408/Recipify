import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
    
      if (!btn) return;
      console.log(btn);
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    const curPage = this._data.page;

    if (curPage === 1 && numPages > 1) {
      //  console.log(sass);
      return this._generateMarkupBtnNext(curPage + 1);
    }

    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtnPrev(curPage - 1);
    }

    if (curPage < numPages) {
      return `${this._generateMarkupBtnPrev(
        curPage - 1
      )}${this._generateMarkupBtnNext(curPage + 1)}`;
    }

    return '';
  }

  _generateMarkupBtnPrev(curPage) {
    return `
    <button data-goto="${curPage}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page${curPage}</span>
    </button>
     `;
  }

  _generateMarkupBtnNext(curPage) {
    return `<button data-goto="${curPage}" class="btn--inline pagination__btn--next">
   <span>Page ${curPage}</span>
   <svg class="search__icon">
     <use href="${icons}#icon-arrow-right"></use>
   </svg>
 </button>`;
  }
}

export default new PaginationView();
