window.addEventListener("message", function(event) {
    var v = event.data    
    switch (v.action) {
        case 'openReportMenu': 
            setInterval(function() {
                var date = new Date;
                var minute = date.getMinutes()
                var hour = date.getHours()
                var year = date.getFullYear();
                var month = date.getMonth(); // beware: January = 0; February = 1, etc.
                var day = date.getDate();
                $('.feCha span').text(` ${day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}.${(month+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}.${year} ${hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`)
            }, 1000);
             $('.NameInTop span').text(`${v.username}`)
             $('.container').fadeIn(500)
        break;

        case 'updateCoords':
            console.log(v.coordenadas)
            $('#locacionPlayer').val(v.coordenadas)
            $('#locacionBugs').val(v.coordenadas)
            $('#locacionOther').val(v.coordenadas)
        break;

        case 'adminPanel': 
            var putita 
            $('.ListReportPe').fadeIn(500)
            if (v.checkjs == 0) {
                console.log('false')
                putita = '<i class="fas fa-check" style="color:green; text-shadow: 0vw 0vw 0.8vw green"></i>'
            } else if(v.checkjs == 1) {
                putita = '<i class="fas fa-times" style="color:red; text-shadow: 0vw 0vw 0.8vw red"></i>'
            }
            $('tbody').append(`
                <tr class="borrarReportesXd">
                    <td class="titulojs">${v.titulojs}</td>
                    <td class="namejs">${v.namejs}</td>
                    <td class="typejs">${v.typejs}</td>
                    <td class="checkjs">${putita}</td>
                    <td class="datejs">${v.datejs}</td>
                </tr>
            `)
        break;
    }
});

$(document).keyup((e) => {
    if (e.key === "Escape") {
        CloseAll()
    }
});


$(function(){
    $('.closeMenu').click(function(){
        CloseAll()
    })
    $('.BugReport').click(function(){
        OpenBugReport()
        $('.titulo').text('Bug Report')
    })

    $('.Other').click(function(){
        OpenOtherReport()
        $('.titulo').text('Other Report')
    })

    $('.PlayerReportClick').click(function(){
        OpenPlayerReport()
        $('.titulo').text('Player Report')
    })


    $('.GetCoords').click(function(){
        console.log('pressed?')
        $.post('https://Roda_ReportSystemV2/GetCoords', JSON.stringify({}));
    })

    $('.fa-image').click(function(){
        $('.fa-image').hide()
        $('.inputImage').fadeIn(500)

    })

    $('.sendReport').click(function(){
        var date = new Date;
        var minute = date.getMinutes()
        var hour = date.getHours()
        var year = date.getFullYear();
        var month = date.getMonth(); // beware: January = 0; February = 1, etc.
        var day = date.getDate();
        fecha = `${day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}.${(month+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}.${year}`
        titulo = $('#TitleText-1').val() || $('#TitleText-2').val() || $('#TitleText-3').val()
        descripcion = $('#DescriptionText-1').val() || $('#DescriptionText-2').val() || $('#DescriptionText-3').val() 
        username = $('.NameUser').text()
        picture = $('#imagenPapi-player').val() || $('#imagenPapi-other').val() || $('#imagenPapi-bug').val()
        coords = $('#locacionBugs').val() || $('#locacionOther').val() || $('#locacionPlayer').val()
        type = $('.titulo').text()
        pidreportes = $('#pidjs').val() 
        $.post('https://Roda_ReportSystemV2/SendData', JSON.stringify({
            titulo : titulo || 'NO TITLE',
            descripcion : descripcion || 'NO DESCRIPTION',
            username : username, 
            fecha : fecha, 
            picture : picture || 'NULL',
            coords : coords,
            type : type || 'Default',
            targetid : pidreportes || 0
        }));
        CloseAll()
    })
})

function CloseAll(){
    $.post('https://Roda_ReportSystemV2/exit', JSON.stringify({}));
    $('.container').fadeOut(500)
    $('.borrarTodoxD').show()
    $('.ReportBugPage').hide()
    $('.OtherReport').hide()
    $('.PlayerReport').hide()
    $('.fa-image').show()
    $('.inputImage').hide()
    $(':input').val('')
    $('.titulo').text('RODA REPORT SYSTEM')
}

function OpenBugReport(){
    $('.borrarTodoxD').hide()
    $('.ReportBugPage').show()
}

function OpenOtherReport(){
    $('.borrarTodoxD').hide()
    $('.OtherReport').show()
}

function OpenPlayerReport(){
    $('.borrarTodoxD').hide()
    $('.PlayerReport').show()

}

function OpenPrincipalMenu() {
    $('.borrarTodoxD').show()
}
