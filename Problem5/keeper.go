package keeper

import (
	"x/crude/types" // your custom module types

	sdk "github.com/cosmos/cosmos-sdk/types" // Cosmos SDK types
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

type Keeper struct {
	storeKey sdk.StoreKey
	cdc      sdk.Codec
}

// CreateResource creates a new resource in the store
func (k Keeper) CreateResource(ctx sdk.Context, resource types.Resource) error {
	store := ctx.KVStore(k.storeKey)
	store.Set([]byte(resource.Id), k.cdc.MustMarshalBinaryBare(&resource))
	return nil
}

// GetResource retrieves a resource from the blockchain by ID
func (k Keeper) GetResource(ctx sdk.Context, id string) (types.Resource, error) {
	store := ctx.KVStore(k.storeKey)
	data := store.Get([]byte(id))
	if data == nil {
		return types.Resource{}, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "resource not found")
	}

	var resource types.Resource
	k.cdc.MustUnmarshalBinaryBare(data, &resource)
	return resource, nil
}

// UpdateResource updates a resource in the store
func (k Keeper) UpdateResource(ctx sdk.Context, resource types.Resource) error {
	store := ctx.KVStore(k.storeKey)
	store.Set([]byte(resource.Id), k.cdc.MustMarshalBinaryBare(&resource))
	return nil
}

// DeleteResource deletes a resource from the store
func (k Keeper) DeleteResource(ctx sdk.Context, id string) error {
	store := ctx.KVStore(k.storeKey)
	store.Delete([]byte(id))
	return nil
}
