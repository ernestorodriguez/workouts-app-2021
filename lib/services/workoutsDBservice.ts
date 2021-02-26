/* eslint-disable radix */
import config from 'config';
import sequelize, { Sequelize } from 'sequelize';

const {
    name: dbName,
    user: dbUser,
    password: dbPassword,
    host: dbHost,
} = config.get('dataBase');


const sql = new Sequelize(dbName, dbUser,dbPassword, {
    host: dbHost,
    dialect: 'mysql',
});

function querySelect(selection: string, queryCondition: string) : Promise<object> {
    return sql.query(`${selection}${queryCondition}`, {
        type: sequelize.QueryTypes.SELECT,
    }).then((result: any) => {
        return result;
    });
}

interface Replacements {
    start_date: string,
    thumbnail_default: string,
    thumbnail_medium: string,
    thumbnail_high: string,
    video_id: string,
}

const getKeys = (keys: string[], replacements: Replacements) => {
    let result = keys ? keys.join(', ') : '*';
    Object.keys(replacements).forEach((keyString: string) => {
        const key = keyString as keyof Replacements;
        result = result.replace(key, `${key} AS ${replacements[key]}`);
    });
    return result;
};

function getQueryCondition(startDate : string, selectedCategories: string) {
    let query = '';
    if (startDate) {
        const [year, month] = startDate.split('-');
        query += ` WHERE month(start_date)=${Number.parseInt(month)} AND year(start_date)=${Number.parseInt(year)}`;

        if (selectedCategories) {
            query += ` AND category IN ("${selectedCategories.replace(/,/g, '","')}")`;
        }
    }
    return query;
}

function getLimit(start: number, end: number) {
    let query = '';
    if (start !== undefined) {
        query += ` LIMIT ${start}`;
        if (end) {
            query += `, ${end}`;
        }
    }
    return query;
}
const get = async (table : string, columns: string[], replacements: Replacements, start: number, end: number, startDate: string, selectedCategories: string) => {
    const queryCondition = getQueryCondition(startDate, selectedCategories);
    const selection = `SELECT ${getKeys(columns, replacements)} FROM ${table}`;
    return {
        data: await querySelect(selection, `${queryCondition}${getLimit(start, end)}`),
        results: await querySelect(`SELECT COUNT(*) FROM ${table}`, queryCondition)
            .then((result: any) => result[0]['COUNT(*)']),
    };
};

interface Config {
    table: string,
    columns: string[],
    replacements: Replacements,
}

const getByColumn = (config: Config, column: string, value: string) => {
    const { table, columns, replacements } = config;
    const query = `SELECT ${getKeys(columns, replacements)} FROM ${table} WHERE ${table}.${column} = '${value}'`;
    return sql.query(query, {
        type: sequelize.QueryTypes.SELECT,
    });
};

try {
    sql.authenticate();
} catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
}

export default {
    get,
    getByColumn,
};
