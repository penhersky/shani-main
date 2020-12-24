import 'dotenv-flow/config';
import {
  PORT,
  DB_NAME,
  DB_PASSWORD,
  DB_HOST,
  DB_USER_NAME,
} from '../src/config';

describe('# Download the basic dependencies', () => {
  it('PORT', () => {
    expect(PORT).not.toBeNaN();
    expect(typeof PORT === 'number');
  });
  it('DB_NAME', () => {
    expect(DB_NAME).not.toBeNaN();
    expect(typeof DB_NAME === 'number');
  });
  it('DB_PASSWORD', () => {
    expect(DB_PASSWORD).not.toBeNaN();
    expect(typeof DB_PASSWORD === 'number');
  });
  it('DB_HOST', () => {
    expect(DB_HOST).not.toBeNaN();
    expect(typeof DB_HOST === 'number');
  });
  it('DB_USER_NAME', () => {
    expect(DB_USER_NAME).not.toBeNaN();
    expect(typeof DB_USER_NAME === 'number');
  });
});
