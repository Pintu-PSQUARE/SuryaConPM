import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);


export class connectDb {
  public db: SQLite.SQLiteDatabase | undefined;
  constructor() {
    // SQLite.DEBUG(true);
    SQLite.openDatabase(
      {
        createFromLocation: 2,
        name: 'suryacon.db',
        location: 'Documents',
      }
    ).then((db) => {
      this.db = db;
      console.info('Database opened successfully...');
    }).catch((error) => {
      console.error('Error opening database', error);
    });
  }
}