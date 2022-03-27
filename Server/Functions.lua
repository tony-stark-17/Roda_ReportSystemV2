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
    for k,v in pairs(Config.Admins) do 
        if v == iden then 
            return true
        end
    end
    return false
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
    return result    
end