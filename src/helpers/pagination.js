const paginationData = async (arrForAggregate, limit=10, page) => {
    const docLimit = +limit;
    const pageNumber = page ? page - 1 : 0;

    arrForAggregate.push({ $skip: docLimit * pageNumber })
    arrForAggregate.push({ $limit: docLimit })
}

export default paginationData