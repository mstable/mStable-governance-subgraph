import { Address } from '@graphprotocol/graph-ts'
import { Token } from '../../generated/schema'
import { ERC20Detailed } from '../../generated/IncentivisedVotingLockup/ERC20Detailed'

export function getOrCreateToken(address: Address): Token {
  let entity = Token.load(address.toHexString())

  if (entity != null) {
    return entity as Token
  }

  {
    let entity = new Token(address.toHexString())

    let contract = ERC20Detailed.bind(address)

    entity.address = address
    entity.name = contract.name()
    entity.symbol = contract.symbol()
    entity.decimals = contract.decimals()
    entity.totalSupply = contract.totalSupply()
    entity.save()

    return entity
  }
}
