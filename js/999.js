$(document).ready(function () {
    var url = "ETF_999.json";
    var rs,table;
    $.ajax({
        type: "GET",
        url: url,
        success: function (result) {
            //fund details
            $('.effdate').text(result['pricing'][0].effdate);
            $('.ticker').text(result['details'][2].data);
            $('.cusip').text(result['details'][3].data);
            $('.exchange').text(result['details'][4].title);
            $('.inception').text(result['details'][8].data);
            $('.ratio').text(result['details'][9].data);
            $('.gross').text(result['details'][10].data);
            //top holdings
            rs = sortJSON(result['holdings'],'percentmv', '321');
            table = $('#top-holdings');
            for (var i = 0; i < 10; i++) {
                table.append(
                    '<tr><td>' + rs[i].ticker + '</td><td>' + rs[i].descr1 + '</td><td class="number">' + perc(rs[i].percentmv) + '</td></tr>'
                );
            }
            //all holdings
            table = $('#all-holdings');
            for (var i in rs) {
                table.append(
                    '<tr><td>' + rs[i].ticker + '</td><td>' + rs[i].descr1 + '</td><td class="number">' + perc(rs[i].percentmv) + '</td></tr>'
                );
            }
            //MV Performance
            rs = result['pricing'][0];
            for (var i in rs) {
                rs[i] = (rs[i] == null) ? 'N/A' : rs[i];
            }
            table = $('#performanceDaily');
            table.append(
                '<caption>Daily as of ' + rs.effdate + '</caption>\
                <thead class="cf">\
                <tr class="number""><th>One Month</th><th>Two Months</th><th>Three Months</th><th>YTD</th><th>One Year</th><th>Inception</th></tr>\
                </thead>\
                <tbody>\
                <tr class="number">\
                <td data-title="One Month">' + perc(rs.MO1_TRR) + '</td><td data-title="Two Months">' + perc(rs.MO2_TRR) + '</td><td data-title="Three Months">' + perc(rs.MO3_TRR) + '</td>\
                <td data-title="YTD">' + perc(rs.YTD_TRR) + '</td><td data-title="One Year">' + perc(rs.YR1_TRR) + '</td><td data-title="Inception">' + perc(rs.INCEPTION_TRR) + '</td>\
                </tr>\
                </tbody>'
            )
            table = $('#performanceMonth');
            table.append(
                '<caption>Month Ending as of ' + rs.medate + '</caption>\
                <thead class="cf">\
                <tr class="number""><th>One Month</th><th>Two Months</th><th>Three Months</th><th>YTD</th><th>One Year</th><th>Inception</th></tr>\
                </thead>\
                <tbody>\
                <tr class="number">\
                <td data-title="One Month">' + perc(rs.MO1_TRR_ME) + '</td><td data-title="Two Months">' + perc(rs.MO2_TRR_ME) + '</td><td data-title="Three Months">' + perc(rs.MO3_TRR_ME) + '</td>\
                <td data-title="YTD">' + perc(rs.YTD_TRR_ME) + '</td><td data-title="One Year">' + perc(rs.YR1_TRR_ME) + '</td><td data-title="Inception">' + perc(rs.INCEPTION_TRR_ME) + '</td>\
                </tr>\
                </tbody>'
            )
            table = $('#performanceQuarter');
            table.append(
                '<caption>Quarter Ending as of ' + rs.qedate + '</caption>\
                <thead class="cf">\
                <tr class="number""><th>One Month</th><th>Two Months</th><th>Three Months</th><th>YTD</th><th>One Year</th><th>Inception</th></tr>\
                </thead>\
                <tbody>\
                <tr class="number">\
                <td data-title="One Month">' + perc(rs.MO1_TRR_QE) + '</td><td data-title="Two Months">' + perc(rs.MO2_TRR_QE) + '</td><td data-title="Three Months">' + perc(rs.MO3_TRR_QE) + '</td>\
                <td data-title="YTD">' + perc(rs.YTD_TRR_QE) + '</td><td data-title="One Year">' + perc(rs.YR1_TRR_QE) + '</td><td data-title="Inception">' + perc(rs.INCEPTION_TRR_QE) + '</td>\
                </tr>\
                </tbody>'
            )
            //pricing
            table = $('#pricing');
            table.append('<tr class="number"><td>' + twoDec(rs.PX_MID) + '</td><td>' + twoDec(rs.PX_YEST_CLOSE) + '</td><td>' + perc(rs.FUND_PCT_PREMIUM) + '</td></tr>');
			//NAV Performance
            rs = result['performance'][0];
            for (var i in rs) {
                rs[i] = (rs[i] == null) ? 'N/A' : rs[i];
            }
            table = $('#navPerformanceDaily');
            table.append(
                '<caption>Daily as of ' + rs.enddate + '</th></caption>\
                <thead class="cf">\
                <tr class="number"><th>One Month</th><th>Two Months</th><th>Three Months</th><th>YTD</th><th>One Year</th><th>Inception</th></tr>\
                </thead>\
                <tbody>\
                <tr class="number">\
                <td data-title="One Month">' + perc(rs.NAV1mo) + '</td><td data-title="Two Months">' + perc(rs.NAV2mo) + '</td><td data-title="Three Months">' + perc(rs.NAV3mo) + '</td>\
                <td data-title="YTD">' + perc(rs.NAVytd) + '</td><td data-title="One Year">' + perc(rs.NAV1yr) + '</td><td data-title="Inception">' + perc(rs.NAVinc) + '</td>\
                </tr>\
                </tbody>'
            )
            table = $('#navPerformanceMonth');
            table.append(
                '<caption>Month Ending as of ' + rs.medate + '</th></caption>\
                <thead class="cf">\
                <tr class="number"><th>One Month</th><th>Two Months</th><th>Three Months</th><th>YTD</th><th>One Year</th><th>Inception</th></tr>\
                </thead>\
                <tbody>\
                <tr class="number">\
                <td data-title="One Month">' + perc(rs.NAV1moME) + '</td><td data-title="Two Months">' + perc(rs.NAV2moME) + '</td><td data-title="Three Months">' + perc(rs.NAV3moME) + '</td>\
                <td data-title="YTD">' + perc(rs.NAVytdME) + '</td><td data-title="One Year">' + perc(rs.NAV1yrME) + '</td><td data-title="Inception">' + perc(rs.NAVincME) + '</td>\
                </tr>\
                </tbody>'
            )
            table = $('#navPerformanceQuarter');
            table.append(
                '<caption>Quarter Ending as of ' + rs.qedate + '</th></caption>\
                <thead class="cf">\
                <tr class="number"><th>One Month</th><th>Two Months</th><th>Three Months</th><th>YTD</th><th>One Year</th><th>Inception</th></tr>\
                </thead>\
                <tbody>\
                <tr class="number">\
                <td data-title="One Month">' + perc(rs.NAV1moQE) + '</td><td data-title="Two Months">' + perc(rs.NAV2moQE) + '</td><td data-title="Three Months">' + perc(rs.NAV3moQE) + '</td>\
                <td data-title="YTD">' + perc(rs.NAVytdQE) + '</td><td data-title="One Year">' + perc(rs.NAV1yrQE) + '</td><td data-title="Inception">' + perc(rs.NAVincQE) + '</td>\
                </tr>\
                </tbody>'
            )
        }
    });

});
