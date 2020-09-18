export enum LockAction {
  DEPOSIT_FOR,
  CREATE_LOCK,
  INCREASE_LOCK_AMOUNT,
  INCREASE_LOCK_TIME,
}

export function mapLockAction(value: i32): string {
  switch (value as LockAction) {
    case LockAction.DEPOSIT_FOR:
      return 'DEPOSIT_FOR'
    case LockAction.CREATE_LOCK:
      return 'CREATE_LOCK'
    case LockAction.INCREASE_LOCK_AMOUNT:
      return 'INCREASE_LOCK_AMOUNT'
    case LockAction.INCREASE_LOCK_TIME:
      return 'INCREASE_LOCK_TIME'
    default:
      return ''
  }
}

export enum TransactionType {
  CREATE_LOCK,
  INCREASE_LOCK_TIME,
  INCREASE_LOCK_AMOUNT,
  WITHDRAW,
  EJECT,
  CLAIM,
}

export function mapTransactionType(value: i32): string {
  switch (value as TransactionType) {
    case TransactionType.CREATE_LOCK:
      return 'CREATE_LOCK'
    case TransactionType.INCREASE_LOCK_TIME:
      return 'INCREASE_LOCK_TIME'
    case TransactionType.INCREASE_LOCK_AMOUNT:
      return 'INCREASE_LOCK_AMOUNT'
    case TransactionType.WITHDRAW:
      return 'WITHDRAW'
    case TransactionType.EJECT:
      return 'EJECT'
    case TransactionType.CLAIM:
      return 'CLAIM'
    default:
      return ''
  }
}
