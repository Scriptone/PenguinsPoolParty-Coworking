local player: Player

local character = player.Character
local characterCFrame, characterSize = character:GetBoundingBox()

local params = OverlapParams.new()
params.FilterDescendantsInstances = { character }
params.FilterType = Enum.RaycastFilterType.Exclude

local partsTouching = workspace:GetPartBoundsInBox(characterCFrame, characterSize, params)
