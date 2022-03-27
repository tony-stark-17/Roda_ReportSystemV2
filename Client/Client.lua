

RegisterNetEvent('Roda_ReportSystem:OpenUi')
AddEventHandler('Roda_ReportSystem:OpenUi', function (name)
    SetNuiFocus(true,true)
    SendNUIMessage({
        action = 'openReportMenu',
        username = name
    })
end)


function ShowNoti(title, cuerpo, color) 
    SendNUIMessage({
        action = 'showNoti',
        tituloxD = title,
        cuerpoxD = cuerpo,
        color = color
    })
end

RegisterNetEvent('Roda_ReportSystem:ShowNoti')
AddEventHandler('Roda_ReportSystem:ShowNoti', function (title, cuerpo, color)
    ShowNoti(title, cuerpo, color)
end)

RegisterNetEvent('Roda_ReportSystem:SetDataReport')
AddEventHandler('Roda_ReportSystem:SetDataReport', function (data)
    for k,v in pairs(data) do 
        local total = json.decode(v.report)
        SendNUIMessage({
            action = 'UpdateReport',
            titulojs = total.title, 
            namejs = v.name,
            typejs = total.type,
            playerjs = total.targetid,
            picturejs = total.picture,
            descriptionjs = total.description,
            coordsjs = total.coords
        })
    end
end)

RegisterNUICallback('RequestReport', function(data, cb)
    TriggerServerEvent('Roda_ReportSystem:RequestReport', data.reportid)
end)

RegisterNetEvent('Roda_ReportSystem:OpenAdminUi')
AddEventHandler('Roda_ReportSystem:OpenAdminUi', function (data)
    SetNuiFocus(true,true)
    for k,v in pairs(data) do 
        local total = json.decode(v.report)
        SendNUIMessage({
            action = 'adminPanel',
            titulojs = total.title, 
            namejs = v.name,
            typejs = total.type,
            checkjs = v.solved,
            datejs = total.date,
            reportid = v.reportid
        })
    end
end)

RegisterNUICallback('UpdateReport', function(data, cb)
    SetNuiFocus(false, false)
    TriggerServerEvent('Roda_ReportSystem:UpdateReport', data.reportidxd)
end)

RegisterNUICallback('exit', function(data, cb)
    SetNuiFocus(false, false)
end)

RegisterNUICallback('SendData', function(data, cb)
    SetNuiFocus(false, false)
    TriggerServerEvent('Roda_ReportSystem:SaveData', data)
end)

RegisterNUICallback('GetCoords', function(data, cb)
    local coords = GetEntityCoords(PlayerPedId())
    local realcoords = tostring(coords)
    SendNUIMessage({
        action = 'updateCoords', 
        coordenadas = 'vec3('..FormatCoord(coords.x)..','..FormatCoord(coords.y)..', '..FormatCoord(coords.z)..')'
    })
end)

FormatCoord = function(coord)
	if coord == nil then
		return "unknown"
	end

	return tonumber(string.format("%.2f", coord))
end