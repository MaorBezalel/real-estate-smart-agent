import { formatPrice } from '../formatPrice';

describe('formatPrice', () => {
    it('should format price with commas and currency symbol', () => {
        const price = 1_000_000;
        const formattedPrice = formatPrice(price);
        expect(formattedPrice).toBe('1,000,000 ₪');
    });

    it('should format price with commas without currency symbol', () => {
        const price = 500_000;
        const formattedPrice = formatPrice(price, false);
        expect(formattedPrice).toBe('500,000');
    });

    it('should format price with commas and currency symbol when price is a string', () => {
        const price = '2000000';
        const formattedPrice = formatPrice(price);
        expect(formattedPrice).toBe('2,000,000 ₪');
    });
});