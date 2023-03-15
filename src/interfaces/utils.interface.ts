export interface StorageTableConfigInterface {
  filter: Record<string, string>;
  page: {
    length: number;
    pageIndex: number;
    pageSize: number;
    previousPageIndex: number;
  };
}
