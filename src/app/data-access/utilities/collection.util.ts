/**
   * Searches a given array of items using a function that returns the desired text to search
   * @param entries 
   * @param fieldReader Function that returns the desired text to search from each input item
   * @param keywords 
   */
export function searchByField<T>(entries: T[], fieldReader: (curEntry: T) => string, keywords: string): T[] {
    const escapedKeywords = keywords.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regExp = new RegExp(escapedKeywords, 'ig');
    return entries.filter((entry) => {
        return fieldReader(entry).match(regExp);
    });
}