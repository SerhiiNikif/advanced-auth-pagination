import ApiError from '../exceptions/api-error.js';

const sortByURLParams = async (arrForAggregate, attribute, sort) => {
    if (typeof attribute !== 'undefined' && ['price', 'createdate'].includes(attribute.toLowerCase()) &&
        typeof sort !== 'undefined' && ['asc', 'desc'].includes(sort.toLowerCase())
    ) {
        // if attribute and sort are specified
        arrForAggregate.push({ $sort: {[attribute]: sort === 'desc' ? -1 : 1} });
    } else if (typeof attribute === 'undefined' && typeof sort === 'undefined') {
        // skip if attribute and sort are not specified
    } else {
        /*
            If the parameter 'attribute' was specified without 'sort', or vice versa,
            or if these parameters were specified incorrectly
        */
        throw ApiError.SyntaxError("You specified the 'attribute' and 'sort' parameters incorrectly");
    }
}

export default sortByURLParams