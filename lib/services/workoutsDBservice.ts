import sequelize from "sequelize";
import sql from "./mySqlConnection";

function querySelect(
  selection: string,
  queryCondition: string
): Promise<object> {
  return sql
    .query(`${selection}${queryCondition}`, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((result: any) => {
      return result;
    });
}

export interface Replacements {
  start_date: string;
  thumbnail_default: string;
  thumbnail_medium: string;
  thumbnail_high: string;
  video_id: string;
}

const getKeys = (keys: string[], replacements: Replacements) => {
  let result = keys ? keys.join(", ") : "*";
  Object.keys(replacements).forEach((keyString: string) => {
    const key = keyString as keyof Replacements;
    result = result.replace(key, `${key} AS ${replacements[key]}`);
  });
  return result;
};

function getQueryCondition(startDate: string, selectedCategories: string) {
  let query = "";
  if (startDate) {
    const [year, month] = startDate.split("-");
    query += ` WHERE month(start_date)=${Number.parseInt(
      month
    )} AND year(start_date)=${Number.parseInt(year)}`;

    if (selectedCategories) {
      query += ` AND category IN ("${selectedCategories.replace(
        /,/g,
        '","'
      )}")`;
    }
  }
  return query;
}

function getLimit(start: number, end: number) {
  let query = "";
  if (start !== undefined) {
    query += ` LIMIT ${start}`;
    if (end) {
      query += `, ${end}`;
    }
  }
  return query;
}

export interface GetOptions {
  table: string;
  columns: string[];
  replacements: Replacements;
  start: number;
  end: number;
  startDate: string;
  selectedCategories: string;
}

export const get = async (options: GetOptions) => {
  const {
    table,
    columns,
    replacements,
    start,
    end,
    startDate,
    selectedCategories,
  } = options;

  const queryCondition = getQueryCondition(startDate, selectedCategories);
  const selection = `SELECT ${getKeys(columns, replacements)} FROM ${table}`;
  return {
    data: await querySelect(
      selection,
      `${queryCondition}${getLimit(start, end)}`
    ),
    results: await querySelect(
      `SELECT COUNT(*) FROM ${table}`,
      queryCondition
    ).then((result: any) => result[0]["COUNT(*)"]),
  };
};

export interface Config {
  table: string;
  columns: string[];
  replacements: Replacements;
}

export const getByColumn = (config: Config, column: string, value: string) => {
  const { table, columns, replacements } = config;
  const query = `SELECT ${getKeys(
    columns,
    replacements
  )} FROM ${table} WHERE ${table}.${column} = '${value}'`;
  return sql.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });
};

sql
  .authenticate()
  .catch((error) => console.error("Unable to connect to the database:", error));
