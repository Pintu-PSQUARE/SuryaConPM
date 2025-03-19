/* eslint-disable @typescript-eslint/no-explicit-any */
import {ResultSet, Transaction} from 'react-native-sqlite-storage';
import {connectDb} from './db';
const database = new connectDb();
export interface ContactType {
  id: string;
  name: string;
  number: string;
  note: string;
}

export class Contact {
  constructor() {
    this.createTable();
  }
  private createTable() {
    if (database.db) {
      database.db.transaction((tx: Transaction) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS contact (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              name VARCHAR(50), 
              number VARCHAR(15), 
              note VARCHAR(150)
            )`,
          [],
          () => {
            this.createCallHistoryTable();
            console.info('Table "contact" created successfully...');
          },
          (tx: Transaction, error: any) => {
            console.error('Error creating "contact" table', error);
          },
        );
      });
    }
  }
  public getContact(): Promise<ContactType[]> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            'SELECT * FROM contact',
            [],
            (tx: Transaction, results: ResultSet) => {
              const rows = results.rows;
              const users: ContactType[] = [];
              for (let i = 0; i < rows.length; i++) {
                users.push(rows.item(i));
              }
              resolve(users);
            },
            (tx: Transaction, error: any) => {
              console.error('Error fetching users', error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }
  private createCallHistoryTable() {
    if (database.db) {
    }
  }
  public insertUser(
    name: string,
    number: string,
    note: string,
    last: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            'INSERT INTO contact (name, number, note) VALUES (?, ?, ?)',
            [name + last, number, note],
            () => {
              resolve(true);
            },
            (tx: Transaction, error: any) => {
              console.error('Error inserting user', error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }
  public dropTable(tableName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            `DROP TABLE IF EXISTS ${tableName}`,
            [],
            () => {
              resolve(true);
            },
            (tx: Transaction, error: any) => {
              console.error(`Error dropping table "${tableName}"`, error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }
}
export class MessageObj {
  constructor() {
    if (database.db) {
      this.createMessageTable();
      this.createMessageInfoTable();
    }
  }
  private createMessageTable() {
    if (database.db) {
      database.db.transaction((tx: Transaction) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS message (
                        id VARCHAR(50) UNIQUE, 
                        reply VARCHAR(50), 
                        chatId VARCHAR(50), 
                        sender VARCHAR(50), 
                        message VARCHAR(500), 
                        isRead BOOLEAN,
                        date VARCHAR(20),
                        isDelete BOOLEAN DEFAULT 0,
                        isBookmark BOOLEAN DEFAULT 0,
                        PRIMARY KEY (id)
                    )`,
          [],
          () => {
            console.info('Table "message" created successfully...');
          },
          (tx: Transaction, error: any) => {
            console.error('Error creating "message" table', error);
          },
        );
      });
    } else {
      console.error("Db Is Not connected createTable 'message'");
    }
  }
  private createMessageInfoTable() {
    if (database.db) {
      database.db.transaction((tx: Transaction) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS messageInfo (
                        id VARCHAR(50), 
                        user VARCHAR(50), 
                        status VARCHAR(50), 
                        readTime VARCHAR(50), 
                        receiveTime VARCHAR(50),
                        FOREIGN KEY (id) REFERENCES message(id)
                    )`,
          [],
          () => {
            console.info('Table "message info" created successfully...');
          },
          (tx: Transaction, error: any) => {
            console.error('Error creating "message info" table', error);
          },
        );
      });
    } else {
      console.error("Db Is Not connected createTable 'messageInfo'");
    }
  }
  public insertMessageInfoTable(
    id: string,
    user: string,
    status: string,
    readTime?: string,
    receiveTime?: string,
  ) {
    if (database.db) {
      database.db.transaction((tx: Transaction) => {
        tx.executeSql(
          `
                    SELECT status FROM messageInfo WHERE id = ? AND user = ? 
                    `,
          [id, user],
          (_, result) => {
            if (result.rows.length === 0) {
              tx.executeSql(
                `
                                    INSERT INTO messageInfo (id, user, status, receiveTime) 
                                    VALUES (?, ?, ?, ?)
                                    `,
                [id, user, status, receiveTime || new Date().toISOString()],
                () => {
                  console.info(
                    'New "receive" entry inserted in "messageInfo".',
                  );
                },
                (tx, error) => {
                  console.error(
                    'Error inserting "receive" entry in "messageInfo":',
                    error,
                  );
                },
              );
            } else {
              const existingStatus = result.rows.item(0).status;
              if (status === 'read' && existingStatus !== 'read') {
                tx.executeSql(
                  `
                                    UPDATE messageInfo 
                                    SET status = ?, readTime = ? 
                                    WHERE id = ? AND user = ? 
                                    `,
                  [status, readTime || new Date().toISOString(), id, user],
                  () => {
                    console.info('Status updated to "read" in "messageInfo".');
                  },
                  (tx, error) => {
                    console.error(
                      'Error updating status to "read" in "messageInfo":',
                      error,
                    );
                  },
                );
              }
            }
          },
          (tx: Transaction, error: any) => {
            console.error('Error creating "message info" table', error);
          },
        );
      });
    } else {
      console.error(
        "Database is not connected. Failed to upsert in 'messageInfo'",
      );
    }
  }
  public getMessage(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            `SELECT 
                            message.*,
                            COUNT(CASE WHEN messageInfo.status = 'read' THEN 1 END) AS read_count,
                            COUNT(CASE WHEN messageInfo.status = 'received' THEN 1 END) AS receive_count
                        FROM 
                            message
                        LEFT JOIN 
                            messageInfo ON message.id = messageInfo.id
                        WHERE  
                            isDelete = ?
                        GROUP BY 
                            message.id;`,
            [false],
            (tx: Transaction, results: ResultSet) => {
              const rows = results.rows;
              const users: any[] = [];
              for (let i = 0; i < rows.length; i++) {
                users.push(rows.item(i));
              }
              resolve(users);
            },
            (tx: Transaction, error: any) => {
              console.error('Error fetching  getMessage this asd', error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }

  public insertManyMessages(
    messages: Array<{
      id: string;
      chatId: string;
      date: string;
      sender: string;
      message: string;
      isRead: boolean;
      reply: string;
    }>,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction(
          (tx: Transaction) => {
            messages.forEach(
              ({id, chatId, sender, message, isRead, reply, date}) => {
                tx.executeSql(
                  'INSERT OR IGNORE INTO message (id, chatId, sender, message, isRead, date, reply) VALUES (?, ?, ?, ?, ?, ?, ?)',
                  [id, chatId, sender, message, isRead, new Date(date), reply],
                  () => {
                    console.info(`Message with id ${id} inserted successfully`);
                  },
                  (tx: Transaction, error: any) => {
                    console.error(
                      `Error inserting message with id ${id}`,
                      error,
                    );
                  },
                );
              },
            );
          },
          error => {
            console.error('Transaction failed insertManyMessages', error);
            reject(error);
          },
          () => {
            console.info('All messages inserted successfully');
            resolve(true);
          },
        );
      } else {
        reject('Database not initialized');
      }
    });
  }
  public insertMessage({
    id,
    chatId,
    sender,
    message,
    isRead,
    reply,
  }: {
    id: string;
    chatId: string;
    sender: string;
    message: string;
    isRead: boolean;
    reply: string;
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            'INSERT OR IGNORE INTO message (id, chatId, sender, message, isRead, date, reply) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, chatId, sender, message, isRead, new Date(), reply],
            (tx: Transaction, result: ResultSet) => {
              console.info('Message inserted successfully', id);
              resolve(true);
            },
            (tx: Transaction, error: any) => {
              console.error('Error inserting Message', error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }
  public markRead({id}: {id: string}): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            'UPDATE message SET  isRead = ? WHERE id = ?',
            [true, id],
            () => {
              resolve(true);
            },
            (tx: Transaction, error: any) => {
              console.error('Error updating Message', error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }
  public markBookMark({id}: {id: string}): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            'UPDATE message SET  isBookmark = ? WHERE id = ?',
            [true, id],
            () => {
              resolve(true);
            },
            (tx: Transaction, error: any) => {
              console.error('Error updating Message', error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }
  public deleteMessage({id}: {id: string}): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            'UPDATE message SET  isDelete = ? WHERE id = ?',
            [true, id],
            () => {
              resolve(true);
            },
            (tx: Transaction, error: any) => {
              console.error('Error updating Message', error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }
  public getBookMark({
    id,
    bookmark,
  }: {
    id: string;
    bookmark: boolean;
  }): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            `SELECT * FROM message WHERE chatId = ? AND isBookmark = ? `,
            [id, true],
            (tx: Transaction, results: ResultSet) => {
              const rows = results.rows;
              const users: any[] = [];
              for (let i = 0; i < rows.length; i++) {
                users.push(rows.item(i));
              }
              console.error(users);
              resolve(users);
            },
            (tx: Transaction, error: any) => {
              console.error('Error fetching getBookMark', error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }
  public markDelete({id}: {id: string}): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            'UPDATE message SET  isDelete = ? WHERE id = ?',
            [true, id],
            () => {
              resolve(true);
            },
            (tx: Transaction, error: any) => {
              console.error('Error updating Message', error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }
  public GetMessageInfo({id}: {id: string}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        console.log('this is inside ', id);
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            'SELECT * FROM messageInfo WHERE id = ?',
            [id],
            (tx: Transaction, results: ResultSet) => {
              const rows = results.rows;
              const users: any[] = [];
              for (let i = 0; i < rows.length; i++) {
                users.push(rows.item(i));
              }
              resolve(users);
            },
            (tx: Transaction, error: any) => {
              console.error('Error fetching getBookMark', error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }
  public dropTable(tableName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (database.db) {
        database.db.transaction((tx: Transaction) => {
          tx.executeSql(
            `DROP TABLE IF EXISTS ${tableName}`,
            [],
            () => {
              console.info(`Table is deleted "${tableName}"`);
              resolve(true);
            },
            (tx: Transaction, error: any) => {
              console.error(`Error dropping table "${tableName}"`, error);
              reject(error);
            },
          );
        });
      } else {
        reject('Database not initialized');
      }
    });
  }
}
