import {
  ClaimTransaction,
  CreateLockTransaction,
  EjectTransaction,
  IncreaseLockAmountTransaction,
  IncreaseLockTimeTransaction,
  WithdrawTransaction,
} from '../../generated/schema'
import {
  Deposit,
  Ejected,
  RewardPaid,
  Withdraw,
} from '../../generated/IncentivisedVotingLockup/IncentivisedVotingLockup'
import { LockAction, mapTransactionType, TransactionType } from '../utils'

export function getOrCreateWithdrawTransaction(
  event: Withdraw,
): WithdrawTransaction {
  let hash = event.transaction.hash
  let type = mapTransactionType(TransactionType.WITHDRAW)
  let id = hash.toHexString().concat(type)
  let sender = event.transaction.from
  let timestamp = event.block.timestamp
  let block = event.block.number.toI32()

  let transaction = WithdrawTransaction.load(id)

  if (transaction != null) {
    return transaction as WithdrawTransaction
  }

  transaction = new WithdrawTransaction(id)

  transaction.sender = sender
  transaction.hash = hash
  transaction.timestamp = timestamp
  transaction.block = block

  transaction.provider = event.params.provider
  transaction.value = event.params.value
  transaction.type = type

  transaction.save()
  return transaction as WithdrawTransaction
}

export function getOrCreateEjectTransaction(event: Ejected): EjectTransaction {
  let hash = event.transaction.hash
  let type = mapTransactionType(TransactionType.EJECT)
  let id = hash.toHexString().concat(type)
  let sender = event.transaction.from
  let timestamp = event.block.timestamp
  let block = event.block.number.toI32()

  let transaction = EjectTransaction.load(id)

  if (transaction != null) {
    return transaction as EjectTransaction
  }

  transaction = new EjectTransaction(id)

  transaction.sender = sender
  transaction.hash = hash
  transaction.timestamp = timestamp
  transaction.block = block
  transaction.type = type

  transaction.ejected = event.params.ejected
  transaction.ejector = event.params.ejector

  transaction.save()
  return transaction as EjectTransaction
}

export function getOrCreateClaimTransaction(
  event: RewardPaid,
): ClaimTransaction {
  let hash = event.transaction.hash
  let type = mapTransactionType(TransactionType.CLAIM)
  let id = hash.toHexString().concat(type)
  let sender = event.transaction.from
  let timestamp = event.block.timestamp
  let block = event.block.number.toI32()

  let transaction = ClaimTransaction.load(id)

  if (transaction != null) {
    return transaction as ClaimTransaction
  }

  transaction = new ClaimTransaction(id)

  transaction.sender = sender
  transaction.hash = hash
  transaction.timestamp = timestamp
  transaction.block = block
  transaction.type = type

  transaction.user = event.params.user
  transaction.reward = event.params.reward

  transaction.save()
  return transaction as ClaimTransaction
}

export function handleDepositTransaction(event: Deposit): void {
  switch (event.params.action as LockAction) {
    case LockAction.CREATE_LOCK:
    case LockAction.DEPOSIT_FOR: {
      getOrCreateCreateLockTransaction(event)
      return
    }
    case LockAction.INCREASE_LOCK_AMOUNT: {
      getOrCreateIncreaseLockAmountTransaction(event)
      return
    }

    case LockAction.INCREASE_LOCK_TIME: {
      getOrCreateIncreaseLockTimeTransaction(event)
      return
    }
  }
}

export function getOrCreateCreateLockTransaction(
  event: Deposit,
): CreateLockTransaction {
  let hash = event.transaction.hash
  let type = mapTransactionType(TransactionType.CREATE_LOCK)
  let id = hash.toHexString().concat(type)
  let sender = event.transaction.from
  let timestamp = event.block.timestamp
  let block = event.block.number.toI32()

  let transaction = CreateLockTransaction.load(id)

  if (transaction != null) {
    return transaction as CreateLockTransaction
  }

  transaction = new CreateLockTransaction(id)

  transaction.sender = sender
  transaction.hash = hash
  transaction.timestamp = timestamp
  transaction.block = block
  transaction.type = type

  transaction.provider = event.params.provider
  transaction.value = event.params.value
  transaction.lockTime = event.params.locktime

  transaction.save()
  return transaction as CreateLockTransaction
}

export function getOrCreateIncreaseLockAmountTransaction(
  event: Deposit,
): IncreaseLockAmountTransaction {
  let hash = event.transaction.hash
  let type = mapTransactionType(TransactionType.INCREASE_LOCK_AMOUNT)
  let id = hash.toHexString().concat(type)
  let sender = event.transaction.from
  let timestamp = event.block.timestamp
  let block = event.block.number.toI32()

  let transaction = IncreaseLockAmountTransaction.load(id)

  if (transaction != null) {
    return transaction as IncreaseLockAmountTransaction
  }

  transaction = new IncreaseLockAmountTransaction(id)

  transaction.sender = sender
  transaction.hash = hash
  transaction.timestamp = timestamp
  transaction.block = block
  transaction.type = type

  transaction.provider = event.params.provider
  transaction.value = event.params.value

  transaction.save()
  return transaction as IncreaseLockAmountTransaction
}

export function getOrCreateIncreaseLockTimeTransaction(
  event: Deposit,
): IncreaseLockTimeTransaction {
  let hash = event.transaction.hash
  let type = mapTransactionType(TransactionType.INCREASE_LOCK_TIME)
  let id = hash.toHexString().concat(type)
  let sender = event.transaction.from
  let timestamp = event.block.timestamp
  let block = event.block.number.toI32()

  let transaction = IncreaseLockTimeTransaction.load(id)

  if (transaction != null) {
    return transaction as IncreaseLockTimeTransaction
  }

  transaction = new IncreaseLockTimeTransaction(id)

  transaction.sender = sender
  transaction.hash = hash
  transaction.timestamp = timestamp
  transaction.block = block
  transaction.type = type

  transaction.provider = event.params.provider
  transaction.lockTime = event.params.locktime

  transaction.save()
  return transaction as IncreaseLockTimeTransaction
}
