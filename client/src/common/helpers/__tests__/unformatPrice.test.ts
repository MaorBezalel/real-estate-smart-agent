import { unformatPrice } from '../unformatPrice';

describe('unformatPrice', () => {
    it('should remove commas and currency symbol from the price string', () => {
        const price = '1,234.56₪';
        const result = unformatPrice(price);
        expect(result).toBe(1234.56);
    });

    it('should handle price strings without commas', () => {
        const price = '999.99₪';
        const result = unformatPrice(price);
        expect(result).toBe(999.99);
    });

    it('should handle price strings without currency symbol', () => {
        const price = '1,000.00';
        const result = unformatPrice(price);
        expect(result).toBe(1000);
    });

    it('should handle empty price string', () => {
        const price = '';
        const result = unformatPrice(price);
        expect(result).toBe(0);
    });
});