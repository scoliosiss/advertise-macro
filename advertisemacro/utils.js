export const mc = Client.getMinecraft();
export const RightClick = mc.class.getDeclaredMethod("func_147121_ag");
RightClick.setAccessible(true);
export const WalkForward = new KeyBind(mc.field_71474_y.field_74351_w); 
export const Sprint = new KeyBind(mc.field_71474_y.field_151444_V);
export const prefix = "&l&cScale's advertising macro &f> "
export const stripRank = (rankedPlayer) => rankedPlayer.replace(/\[[\w+\+-]+] /, "").trim()

export function distanceToPlayer(x,y,z) {
    let dX = Player.getX() - x
    let dZ = Player.getZ() - z
    let dY = Player.getY() - y
    let dis = Math.sqrt((dX * dX) + (dZ * dZ))
    let dis2 = Math.sqrt((dis * dis) + (dY * dY))
    return dis2
}

function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180/pi);
}

export function lookAt(x, y, z) {
    let hoekPitch;
    let hoekYaw;
    let PlayerAngleYaw = Player.getPlayer().field_70177_z; let AngleYaw; PlayerAngleYaw %= 360;
    let dX = Player.getX() - x + 0.00001; let dZ = Player.getZ() - z + 0.00001; let dY = Player.getY() - y + 0.00001; 
    let dis = Math.sqrt((dX * dX) + (dZ * dZ))
    if(dX < 0.0 && dZ < 0.0) AngleYaw = radians_to_degrees(Math.atan(dZ/dX)) + 180
    else if(dZ < 0.0 && dX > 0.0) AngleYaw = radians_to_degrees(Math.atan(dZ/dX)) + 360
    else if(dZ > 0.0 && dX < 0.0) AngleYaw = radians_to_degrees(Math.atan(dZ/dX)) + 180
    else if(dZ > 0.0 && dX > 0.0) AngleYaw = radians_to_degrees(Math.atan(dZ/dX))
    hoekYaw = AngleYaw - PlayerAngleYaw + 90
    if (hoekYaw > 180) hoekYaw -= 360;
    if (hoekYaw < -180) hoekYaw += 360;
    Player.getPlayer().field_70177_z += hoekYaw;
    hoekPitch = radians_to_degrees(Math.atan(dY/dis)) - Player.getPlayer().field_70125_A
    Player.getPlayer().field_70125_A += hoekPitch;
    return { Yaw: Player.getPlayer().field_70177_z + hoekYaw, Pitch: Player.getPlayer().field_70125_A + hoekPitch }
}