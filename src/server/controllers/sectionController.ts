const db = require("../databaseModels/sqlModel");
import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import db from '../databaseModels/sqlModel';

interface MyData {
  varname: string;
}

interface MySection {
  script: string;
  title: string;
  varname: string;
  description: string;
}

interface TitleItem {
  title: string;
  varname: string;
  category: string;
}

interface CustomResponse extends Response {
  locals: {
    myData: MyData;
    mySection: MySection[];
    allTitles: TitleItem[];
  };
}

const sectionController: { [key: string]: (req: Request, res: CustomResponse, next: NextFunction) => Promise<void> } = {};

sectionController.grabSection = async (req: Request, res: CustomResponse, next: NextFunction): Promise<void> => {
  const sectionTitle = res.locals.myData.varname;
  const sectionQuery =
    "SELECT scripts.script, meta_data.title, meta_data.varname, meta_data.description FROM scripts JOIN meta_data on scripts.section = $1 AND meta_data.varname = $1";

  try {
    const result: QueryResult = await db.query(sectionQuery, [sectionTitle]);
    res.locals.mySection = result.rows;
    return next();
  } catch (err) {
    return next({
      log: "Express error handler caught in grabSection middleware error",
      status: 500,
      message: { err: "An error in grabSection" },
    });
  }
};

sectionController.grabAllSectionTitles = async (req: Request, res: CustomResponse, next: NextFunction): Promise<void> => {
  const sectionQuery = "SELECT title, varname, category FROM meta_data;";
  
  try {
    const result: QueryResult = await db.query(sectionQuery);
    res.locals.allTitles = result.rows;
    return next();
  } catch (err) {
    return next({
      log: "Express error handler caught in grabAllSectionTitles middleware error",
      status: 500,
      message: { err: "An error in grabAllSectionTitles" },
    });
  }
};

export default sectionController;