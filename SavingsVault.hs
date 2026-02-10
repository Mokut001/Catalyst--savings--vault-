
{-# LANGUAGE DataKinds           #-}
{-# LANGUAGE NoImplicitPrelude   #-}
{-# LANGUAGE TemplateHaskell     #-}

module SavingsVault where

import           Plutus.V2.Ledger.Api
import           PlutusTx.Prelude
import qualified PlutusTx

data SavingsDatum = SavingsDatum
    { ownerPkh    :: PubKeyHash
    , savingsGoal :: Integer
    }
PlutusTx.unstableMakeIsData ''SavingsDatum

{-# INLINABLE mkValidator #-}
mkValidator :: SavingsDatum -> () -> ScriptContext -> Bool
mkValidator dat _ ctx = 
    let info = scriptContextTxInfo ctx
        -- Logic: Signed by owner ANd target met (simplified)
        ownerSigned = txSignedBy info (ownerPkh dat)
        targetMet   = True -- Actual implementation would check Script UTXO value
    in ownerSigned && targetMet

validator :: Validator
validator = mkValidatorScript $$(PlutusTx.compile [|| mkValidator ||])
