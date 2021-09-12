import { makeDefaultOptions } from '../options';
import ensureHasAllKeys from '../helpers/ensure-has-all-keys';
import sendResetPwd from '../methods/send-reset-pwd';
import { AuthenticationManagementBase } from './AuthenticationManagementBase';

import type { SetRequired } from 'type-fest';
import type {
  DataSendResetPwd,
  SanitizedUser,
  SendResetPwdOptions
} from '../types';

export class SendResetPwdService extends AuthenticationManagementBase<DataSendResetPwd, SanitizedUser> {
  options: SendResetPwdOptions;

  constructor (options: SetRequired<Partial<SendResetPwdOptions>, 'app'>) {
    super();

    ensureHasAllKeys(options, ['app'], this.constructor.name);
    const defaultOptions: Omit<SendResetPwdOptions, 'app'> = makeDefaultOptions([
      'service',
      'identifyUserProps',
      'skipIsVerifiedCheck',
      'reuseResetToken',
      'resetDelay',
      'sanitizeUserForClient',
      'resetAttempts',
      'shortTokenLen',
      'longTokenLen',
      'shortTokenDigits',
      'notifier',
      'passwordField'
    ]);
    this.options = Object.assign(defaultOptions, options);
  }

  async _create (data: DataSendResetPwd): Promise<SanitizedUser> {
    return await sendResetPwd(
      this.options,
      data.value,
      data.notifierOptions
    );
  }
}
