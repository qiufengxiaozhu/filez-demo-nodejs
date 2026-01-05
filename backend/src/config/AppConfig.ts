import config from 'config';

// 导出类型化的配置
export interface ServerConfig {
  port: number;
  env: string;
}

export interface DatabaseConfig {
  url: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface SessionConfig {
  secret: string;
  maxAge: number;
  key: string;
}

export interface UploadConfig {
  dir: string;
  maxFileSize: number;
}

export interface FilezConfig {
  host: string;
  port: number;
  repoId: string;
  context: string;
}

export interface DemoConfig {
  host: string;
  port: number;
  tokenName: string;
}

export interface AdminConfig {
  username: string;
  password: string;
  email: string;
}

export interface AppConfig {
  server: ServerConfig;
  database: DatabaseConfig;
  jwt: JwtConfig;
  session: SessionConfig;
  upload: UploadConfig;
  filez: FilezConfig;
  demo: DemoConfig;
  admin: AdminConfig;
}

// 导出配置对象
export const appConfig: AppConfig = {
  server: config.get('server'),
  database: config.get('database'),
  jwt: config.get('jwt'),
  session: config.get('session'),
  upload: config.get('upload'),
  filez: config.get('filez'),
  demo: config.get('demo'),
  admin: config.get('admin'),
};

// 兼容旧的导出方式
export { appConfig as config };

