

export const paginateFunc = (data, start, end) => {
    let filteredData = Object.values(Object.fromEntries(Object.entries(data).filter((v, i) => i >= start && i < end)));
    return filteredData;
}