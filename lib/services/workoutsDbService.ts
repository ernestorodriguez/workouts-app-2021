import sequelize from "sequelize";
import sql from "./mySqlConnection";

function querySelect(
  selection: string,
  queryCondition: string
  // eslint-disable-next-line @typescript-eslint/ban-types
): Promise<object> {
  return sql
    .query(`${selection}${queryCondition}`, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((result: any) => {
      return result;
    });
}

interface Replacements {
  start_date: string;
  thumbnail_default: string;
  thumbnail_medium: string;
  thumbnail_high: string;
  video_id: string;
}

const getKeys = (replacements: Replacements, keys?: string[]) => {
  let result = keys ? keys.join(", ") : "*";
  Object.keys(replacements).forEach((keyString: string) => {
    const key = keyString as keyof Replacements;
    result = result.replace(key, `${key} AS ${replacements[key]}`);
  });
  return result;
};

function getQueryCondition(startDate?: string, selectedCategories?: string) {
  if (!startDate && !selectedCategories) {
    return "";
  }

  let query = " WHERE ";

  if (startDate) {
    const [year, month] = startDate.split("-");
    query += `month(start_date)=${Number.parseInt(
      month
    )} AND year(start_date)=${Number.parseInt(year)}`;
  }

  if (startDate && selectedCategories) {
    query += " AND";
  }

  if (selectedCategories) {
    query += ` category IN ("${selectedCategories.replace(/,/g, '","')}")`;
  }
  return query;
}

function getLimit(start?: number, end?: number) {
  let query = "";
  if (start !== undefined) {
    query += ` LIMIT ${start}`;
    if (end) {
      query += `, ${end}`;
    }
  }
  return query;
}

interface GetOptions {
  table: string;
  columns?: string[];
  replacements: Replacements;
  start?: number;
  end?: number;
  startDate?: string;
  selectedCategories?: string;
}

export interface GetResponse {
  data: any;
  results: any;
}

const get = async (options: GetOptions): Promise<GetResponse> => {
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
  const selection = `SELECT ${getKeys(replacements, columns)} FROM ${table}`;
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

interface Config {
  table: string;
  columns: string[];
  replacements: Replacements;
}

const getByColumn = (
  config: Config,
  column: string,
  value: string
): Promise<any> => {
  const { table, columns, replacements } = config;
  const query = `SELECT ${getKeys(
    replacements,
    columns
  )} FROM ${table} WHERE ${table}.${column} = '${value}'`;
  return sql.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });
};

export { getByColumn, get, Config, GetOptions, Replacements };
