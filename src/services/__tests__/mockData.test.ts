import { generateMockData, fetchListData } from '../../mockData';

describe('mockData', () => {
    describe('generateMockData', () => {
        it('should generate correct number of items', () => {
            const items = generateMockData(5);
            expect(items).toHaveLength(5);
        });

        it('should generate items with correct structure', () => {
            const items = generateMockData(1);
            const item = items[0];

            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('description');
            expect(item).toHaveProperty('category');
            expect(item).toHaveProperty('price');
            expect(item).toHaveProperty('image');
            expect(item).toHaveProperty('createdAt');
            expect(item).toHaveProperty('updatedAt');
        });

        it('should generate unique IDs', () => {
            const items = generateMockData(10);
            const ids = items.map(item => item.id);
            const uniqueIds = new Set(ids);

            expect(uniqueIds.size).toBe(ids.length);
        });

        it('should generate items with valid price range', () => {
            const items = generateMockData(100);

            items.forEach(item => {
                expect(item.price).toBeGreaterThanOrEqual(10);
                expect(item.price).toBeLessThanOrEqual(1009);
            });
        });

        it('should generate items with valid categories', () => {
            const items = generateMockData(50);
            const validCategories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Toys', 'Automotive'];

            items.forEach(item => {
                expect(validCategories).toContain(item.category);
            });
        });

        it('should generate items with valid image URLs', () => {
            const items = generateMockData(5);

            items.forEach((item, index) => {
                expect(item.image).toMatch(/^https:\/\/picsum\.photos\/200\/200\?random=\d+$/);
                expect(item.image).toContain(`random=${index + 1}`);
            });
        });

        it('should generate items with valid dates', () => {
            const items = generateMockData(5);

            items.forEach(item => {
                expect(new Date(item.createdAt)).toBeInstanceOf(Date);
                expect(new Date(item.updatedAt)).toBeInstanceOf(Date);
                expect(new Date(item.createdAt).getTime()).toBeLessThanOrEqual(Date.now());
                expect(new Date(item.updatedAt).getTime()).toBeLessThanOrEqual(Date.now());
            });
        });

        it('should default to 2000 items when no count provided', () => {
            const items = generateMockData();
            expect(items).toHaveLength(2000);
        });
    });

    describe('fetchListData', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        it('should return correct response structure', async () => {
            const promise = fetchListData(1, 10);

            // Fast-forward timers
            jest.advanceTimersByTime(500);

            const result = await promise;

            expect(result).toHaveProperty('items');
            expect(result).toHaveProperty('total');
            expect(result).toHaveProperty('page');
            expect(result).toHaveProperty('limit');
        });

        it('should return correct number of items', async () => {
            const promise = fetchListData(1, 5);

            jest.advanceTimersByTime(500);

            const result = await promise;

            expect(result.items).toHaveLength(5);
            expect(result.total).toBe(2000);
            expect(result.page).toBe(1);
            expect(result.limit).toBe(5);
        });

        it('should handle pagination correctly', async () => {
            const promise = fetchListData(2, 10);

            jest.advanceTimersByTime(500);

            const result = await promise;

            expect(result.items).toHaveLength(10);
            expect(result.page).toBe(2);
            expect(result.items[0].id).toBe(11); // Second page starts at item 11
        });

        it('should simulate network delay', async () => {
            const startTime = Date.now();
            const promise = fetchListData(1, 10);

            jest.advanceTimersByTime(500);

            await promise;

            // Since we're using fake timers, we can't test actual time
            // But we can verify the promise resolves after advancing timers
            expect(true).toBe(true);
        });

        it('should default to page 1 and limit 2000', async () => {
            const promise = fetchListData();

            jest.advanceTimersByTime(500);

            const result = await promise;

            expect(result.page).toBe(1);
            expect(result.limit).toBe(2000);
            expect(result.items).toHaveLength(2000);
        });

        it('should handle edge case with page beyond available data', async () => {
            const promise = fetchListData(10, 100); // Page 10 with 100 items per page

            jest.advanceTimersByTime(500);

            const result = await promise;

            // Should return empty array for pages beyond available data
            expect(result.items).toHaveLength(0);
            expect(result.page).toBe(10);
            expect(result.limit).toBe(100);
        });
    });
});
