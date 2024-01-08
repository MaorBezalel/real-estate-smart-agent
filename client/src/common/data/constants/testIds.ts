export const TEST_ID = {
    COMMON: {
        CONTENT: {
            ABOUT_PAGE: 'common-content-about-page',
            FAILED_RESULTS: 'common-content-failed-results',
            LOADING_RESULTS: 'common-content-loading-results',
        },

        CTA: {
            HOME_PAGE: 'common-cta-home-page',
        },

        ILLUSTRATION: {
            ABOUT_PAGE: 'common-illustration-about-page',
            FAILED_RESULTS: 'common-illustration-failed-results',
            HOME_PAGE: 'common-illustration-home-page',
            LOADING_RESULTS: 'common-illustration-loading-results',
        },

        PAGE_HEADING: {
            ABOUT_PAGE: 'common-page-heading-about-page',
            HOME_PAGE: 'common-page-heading-home-page',
            SEARCH_PAGE: 'common-page-heading-search-page',
        },
    },

    FEATURE: {
        SEARCH_FORM: {
            FORM: 'feature-search-form-form',

            FORM_BUTTON: {
                ACTIVE: 'feature-search-form-form-button-active',
                INACTIVE: 'feature-search-form-form-button-inactive',
                LOADING: 'feature-search-form-form-button-loading',
            },

            PRICE_INPUT_FIELD: {
                MIN_PRICE: {
                    INPUT: 'feature-search-form-price-input-field-min-price-input',
                    ERROR_MESSAGE: 'feature-search-form-price-input-field-min-error-message',
                },
                MAX_PRICE: {
                    INPUT: 'feature-search-form-price-input-field-max-price-input',
                    ERROR_MESSAGE: 'feature-search-form-price-input-field-max-error-message',
                },
                SVG_ICON: 'feature-search-form-price-input-field-svg-icon',
            },

            DEAL_TYPE_SELECT_FIELD: {
                SELECT: 'feature-search-form-deal-type-select-field-select',
                OPTION: 'feature-search-form-deal-type-select-field-option',
                ERROR_MESSAGE: 'feature-search-form-deal-type-select-field-error-message',
                SVG_ICON: 'feature-search-form-deal-type-select-field-svg-icon',
            },

            SETTLEMENT_SEARCH_FIELD: {
                INPUT: 'feature-search-form-settlement-search-field-input',
                ERROR_MESSAGE: 'feature-search-form-settlement-search-field-error-message',
                SVG_ICON: 'feature-search-form-settlement-search-field-svg-icon',
                MENU: 'feature-search-form-settlement-search-field-menu',
                MENU_ITEM: 'feature-search-form-settlement-search-field-menu-item',
            },
        },

        PAGINATION: {
            PAGE_NUMBER_BUTTON: 'feature-pagination-page-number-button',
            PAGINATION_BUTTON: 'feature-pagination-pagination-button',
            PAGINATION_BODY: 'feature-pagination-pagination-body',
        },

        RESULTS_CONTROLS: {
            ITEM_COUNT: 'feature-results-control-item-count',
            SORT_BY_DROPDOWN_MENU: 'feature-results-control-sort-by-dropdown-menu',
        },

        REAL_ESTATE_ITEM: 'feature-real-estate-item',
    },
} as const;
