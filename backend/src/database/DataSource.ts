import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { appConfig } from '../config/AppConfig';
import { SysUser, DocMeta, DocControl } from '../entity';

// 解析 SQLite 数据库 URL
const getDatabasePath = (url: string): string => {
  // 处理 file:./data/filez_demo.db 格式
  if (url.startsWith('file:')) {
    return url.replace('file:', '');
  }
  return url;
};

const isDev = true;
// const isDev = appConfig.server.env === 'development';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: getDatabasePath(appConfig.database.url),
  synchronize: isDev, // 仅开发环境自动同步，生产环境需使用 migration
  logging: isDev,
  entities: [SysUser, DocMeta, DocControl],
  migrations: ['src/database/migration/*.ts'],
  subscribers: [],
});

// 初始化数据源
export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✅ 数据库连接成功！');
      console.log(`📁 数据库路径: ${getDatabasePath(appConfig.database.url)}`);
    }
  } catch (error) {
    console.error('❌ 数据库连接失败:', error);
    throw error;
  }
};

// 关闭数据源
export const closeDatabase = async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log('✅ 数据库连接已关闭');
  }
};
