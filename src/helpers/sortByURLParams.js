import ApiError from '../exceptions/api-error.js';

const isValidAttribute = (attribute) => {
    return typeof attribute !== 'undefined' && ['price', 'createdate'].includes(attribute.toLowerCase());
};

const isValidSort = (sort) => {
    return typeof sort !== 'undefined' && ['asc', 'desc'].includes(sort.toLowerCase());
};

export default async function (arrForAggregate, attribute, sort) {
    if (isValidAttribute(attribute) && isValidSort(sort)) {
        arrForAggregate.push({ $sort: {[attribute]: sort === 'desc' ? -1 : 1} });
    } else if (typeof attribute !== 'undefined' || typeof sort !== 'undefined') {
        throw ApiError.SyntaxError("You specified the 'attribute' and 'sort' parameters incorrectly");
    }
};
