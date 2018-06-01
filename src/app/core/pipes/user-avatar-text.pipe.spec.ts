import { UserAvatarTextPipe } from './user-avatar-text.pipe';

describe('UserAvatarTextPipe', () => {
  it('create an instance', () => {
    const pipe = new UserAvatarTextPipe();
    expect(pipe).toBeTruthy();
  });
});
