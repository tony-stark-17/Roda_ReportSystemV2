
if Config.AreYouUseESX then   

    ESX = nil
    TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

end

function SendRodaLog(title, color, message, pic)
    local webHook = ConfigSv.Webhook
    local embedData = {
        {
            ["title"] = title,
            ["color"] = ConfigSv.Colors[color] ~= nil and ConfigSv.Colors[color] or ConfigSv.Colors["default"],
            ["footer"] = {
                ["text"] = os.date("%c"),
            },
            ["image"] = {
                ["url"] = pic
            },
            ["description"] = message,
        }
    }
    PerformHttpRequest(webHook, function(err, text, headers) end, 'POST', json.encode({ username = ConfigSv.NameWebhook,embeds = embedData}), { ['Content-Type'] = 'application/json' })
end
    

function Query(plugin,type,query,var)
	local wait = promise.new()
    if type == 'fetchAll' and plugin == 'mysql' then
		MySQL.Async.fetchAll(query, var, function(result)
            wait:resolve(result)
        end)
    end
    if type == 'execute' and plugin == 'mysql' then
        MySQL.Async.execute(query, var, function(result)
            wait:resolve(result)
        end)
    end
    if type == 'execute' and plugin == 'ghmattisql' then
        exports['ghmattimysql']:execute(query, var, function(result)
            wait:resolve(result)
        end)
    end
    if type == 'fetchAll' and plugin == 'ghmattisql' then
        exports.ghmattimysql:execute(query, var, function(result)
            wait:resolve(result)
        end)
    end
    if type == 'execute' and plugin == 'oxmysql' then
        exports.oxmysql:execute(query, var, function(result)
            wait:resolve(result)
        end)
    end
    if type == 'fetchAll' and plugin == 'oxmysql' then
		exports['oxmysql']:fetch(query, var, function(result)
			wait:resolve(result)
		end)
    end
	return Citizen.Await(wait)
end


function GetIdentifier(src, tipo)
	local src = src 
	local license
	if tipo == 'steam' then 
		for k,v in ipairs(GetPlayerIdentifiers(src)) do
			if string.match(v, 'steam') then
				license = v
				return license
			end
		end
	elseif tipo == 'license' then 
		for k,v in ipairs(GetPlayerIdentifiers(src)) do
			if string.match(v, 'license') then
				license = v
				return license
			end
		end
	elseif tipo == 'discord' then 
		for k,v in ipairs(GetPlayerIdentifiers(src)) do
			if string.match(v, 'discord') then
				license = v
				return license
			end
		end
	end
end


function CheckIsAdmin(src)
    local iden = GetIdentifier(src, Config.Identifier)
    if Config.AreYouUseESX then 
        local Group = nil
        local ExtendedVersion = GetResourceMetadata('es_extended', 'version')
        local xPlayer = ESX.GetPlayerFromId(src)
        if ExtendedVersion == '1.2' or ExtendedVersion == '1.5.0' then 
            Group = xPlayer.group
            for k,v in pairs(Config.GroupsInCaseYouSetTrueAbove) do 
                if v == Group then 
                    return true
                end
            end
        else 
            Group = xPlayer.getGroup()
            for k,v in pairs(Config.GroupsInCaseYouSetTrueAbove) do 
                if v == Group then 
                    return true
                end
            end
        end
    else
        for k,v in pairs(Config.Admins) do 
            if v == iden then 
                return true
            end
        end
        return false
    end

end


function SaveReport(data)
    local dataReport = {
        title = data.titulo, 
        description = data.descripcion,
        date = data.fecha,
        picture = data.picture,
        coords = data.coords,
        type = data.type,
        targetid = data.targetid
    }

    Query(Config.Db, 'execute',
    "INSERT INTO roda_reports (`name`, `report`) VALUES(@name, @report) ",
    {['@name'] = data.username, ['@report'] = json.encode(dataReport)})

end


function GetReports()
    local mierda = nil
    local result = Query(Config.Db, 'fetchAll',
    "SELECT * FROM roda_reports")
    mierda = json.encode(result)
    if mierda == '[]' then 
        return 'Fail'
    else
        return result 
    end
end


function GetReportData(id)
    local result = Query(Config.Db, 'fetchAll',
    "SELECT * FROM roda_reports WHERE reportid = @id", {['@id'] = id})
    return result   
end

function UpdateReport(id)
    Query(Config.Db, 'execute',
    "UPDATE roda_reports SET solved = 1 WHERE reportid = @id", {['@id'] = tonumber(id)})
end


function RemoveAllReports()
    Query(Config.Db, 'execute',
    "DELETE FROM roda_reports WHERE solved = 1")
end


CreateThread(function()  --- This will remove all reports that was solve in server restart or resource restart.
    RemoveAllReports()
end)


function NoticiationForAllAdmins(src)
    for _, playerId in ipairs(GetPlayers()) do
        local havePerms = CheckIsAdmin(playerId)
        if havePerms then 
            TriggerClientEvent('Roda_ReportSystem:ShowNoti', playerId, 'New Report', 'You Get a New Report From '..src..' · '..GetPlayerName(src)..'', '#00ff15')
        end
    end
end