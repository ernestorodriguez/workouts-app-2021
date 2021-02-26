import dbService from './workoutsDBservice';

const table = 'workouts_calendar';
const columns = [
    'id',
    'name',
    'description',
    'start_date',
    'category',
    'alias',
    'thumbnail_default',
    'thumbnail_medium',
    'thumbnail_high',
    'video_id',
];

const replacements = {
    start_date: 'startDate',
    thumbnail_default: 'thumbnailDefault',
    thumbnail_medium: 'thumbnailMedium',
    thumbnail_high: 'thumbnailHigh',
    video_id: 'videoId',
};

const getWorkouts = (page = 1, startDate: string, selectedCategories: string) => {
    let currentPage = page;

    if (page < 1) {
        currentPage = 1;
    }

    const amountByPage = 20;
    const max = amountByPage * currentPage;
    const initialNumber = max - amountByPage;

    return dbService.get(
        table,
        columns,
        replacements,
        initialNumber,
        amountByPage,
        startDate,
        selectedCategories,
    );
};

const getWorkoutByColumnValue = (column: string, value: string) : Promise<any> => {
    const config = {
        table, columns, replacements,
    };

    return dbService.getByColumn(config, column, value)
        .then((response: any) => response[0]);
};

const workoutsService = {
    getPage: getWorkouts,
    get: getWorkoutByColumnValue,
};

export default workoutsService;
