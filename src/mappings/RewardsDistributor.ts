import { IncentivisedVotingLockup } from '../../generated/schema'
import {
  RemovedFundManager,
  Whitelisted,
  DistributedReward,
} from '../../generated/RewardsDistributor/RewardsDistributor'

import { getOrCreateToken } from '../models/Token'
import { getOrCreateRewardsDistributor } from '../models/RewardsDistributor'

export function handleRemovedFundManager(event: RemovedFundManager): void {
  let rewardsDistributor = getOrCreateRewardsDistributor(event.address)

  rewardsDistributor.fundManagers = rewardsDistributor.fundManagers.filter(
    (_managerId) => _managerId !== event.params._address,
  )

  rewardsDistributor.save()
}

export function handleWhitelisted(event: Whitelisted): void {
  let rewardsDistributor = getOrCreateRewardsDistributor(event.address)

  rewardsDistributor.fundManagers = rewardsDistributor.fundManagers.concat([
    event.params._address,
  ])

  rewardsDistributor.save()
}

export function handleDistributedReward(event: DistributedReward): void {
  // Use `.load` because the RewardsDistributor could be used for other
  // contracts; we can't assume otherwise
  let incentivisedVotingLockup = IncentivisedVotingLockup.load(
    event.params.recipient.toHexString(),
  )

  if (incentivisedVotingLockup) {
    let rewardsToken = getOrCreateToken(event.params.rewardToken)

    incentivisedVotingLockup.rewardsToken = rewardsToken.address.toHexString()

    incentivisedVotingLockup.save()
  }
}
