const PDFDocument = require('pdfkit')
const SVGtoPDF = require('svg-to-pdfkit')
const path = require('path')

function buildPDF(dataCallback, endCallback, option) {
	const doc = new PDFDocument({size: 'A4'})
	doc.on('data', dataCallback)
	doc.on('end', endCallback)
	
	// console.log(option)
	const svg = `<svg width="795" height="335" viewBox="0 0 843 342" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="Group 17">
<path id="Intersect" d="M333 342H812.683C829.252 342 842.683 328.569 842.683 312V30C842.683 13.4315 829.252 0 812.683 0H333C328.271 0 323.695 0.656515 319.359 1.88337C318.56 18.3019 304.171 31.5417 286.074 32.7C284.89 35.9091 284.027 39.273 283.521 42.753C284.471 42.2714 285.545 42 286.683 42C290.549 42 293.683 45.134 293.683 49C293.683 52.866 290.549 56 286.683 56C285.332 56 284.07 55.6171 283 54.9539V68.0461C284.07 67.3829 285.332 67 286.683 67C290.549 67 293.683 70.134 293.683 74C293.683 77.866 290.549 81 286.683 81C285.332 81 284.07 80.6171 283 79.9539V93.0461C284.07 92.3829 285.332 92 286.683 92C290.549 92 293.683 95.134 293.683 99C293.683 102.866 290.549 106 286.683 106C285.332 106 284.07 105.617 283 104.954V118.046C284.07 117.383 285.332 117 286.683 117C290.549 117 293.683 120.134 293.683 124C293.683 127.866 290.549 131 286.683 131C285.332 131 284.07 130.617 283 129.954V143.046C284.07 142.383 285.332 142 286.683 142C290.549 142 293.683 145.134 293.683 149C293.683 152.866 290.549 156 286.683 156C285.332 156 284.07 155.617 283 154.954V168.046C284.07 167.383 285.332 167 286.683 167C290.549 167 293.683 170.134 293.683 174C293.683 177.866 290.549 181 286.683 181C285.332 181 284.07 180.617 283 179.954V193.046C284.07 192.383 285.332 192 286.683 192C290.549 192 293.683 195.134 293.683 199C293.683 202.866 290.549 206 286.683 206C285.332 206 284.07 205.617 283 204.954V218.046C284.07 217.383 285.332 217 286.683 217C290.549 217 293.683 220.134 293.683 224C293.683 227.866 290.549 231 286.683 231C285.332 231 284.07 230.617 283 229.954V243.046C284.07 242.383 285.332 242 286.683 242C290.549 242 293.683 245.134 293.683 249C293.683 252.866 290.549 256 286.683 256C285.332 256 284.07 255.617 283 254.954V268.046C284.07 267.383 285.332 267 286.683 267C290.549 267 293.683 270.134 293.683 274C293.683 277.866 290.549 281 286.683 281C285.332 281 284.07 280.617 283 279.954V292C283 292.347 283.004 292.694 283.011 293.04C284.078 292.38 285.336 292 286.683 292C290.549 292 293.683 295.134 293.683 299C293.683 302.866 290.549 306 286.683 306C286.075 306 285.485 305.922 284.922 305.777C285.263 306.97 285.648 308.145 286.074 309.3C304.171 310.458 318.56 323.698 319.359 340.117C323.695 341.344 328.271 342 333 342Z" fill="url(#pattern0)"/>
<path id="Subtract" d="M286.074 32.7C284.086 38.091 283 43.9187 283 50V69.3925C285.727 70.3489 287.683 72.946 287.683 76C287.683 79.054 285.727 81.6511 283 82.6075V94.3925C285.727 95.3489 287.683 97.946 287.683 101C287.683 104.054 285.727 106.651 283 107.607V119.393C285.727 120.349 287.683 122.946 287.683 126C287.683 129.054 285.727 131.651 283 132.607V144.393C285.727 145.349 287.683 147.946 287.683 151C287.683 154.054 285.727 156.651 283 157.607V169.393C285.727 170.349 287.683 172.946 287.683 176C287.683 179.054 285.727 181.651 283 182.607V194.393C285.727 195.349 287.683 197.946 287.683 201C287.683 204.054 285.727 206.651 283 207.607V219.393C285.727 220.349 287.683 222.946 287.683 226C287.683 229.054 285.727 231.651 283 232.607V244.393C285.727 245.349 287.683 247.946 287.683 251C287.683 254.054 285.727 256.651 283 257.607V269.393C285.727 270.349 287.683 272.946 287.683 276C287.683 279.054 285.727 281.651 283 282.607V292C283 292.809 283.019 293.613 283.057 294.413C285.755 295.385 287.683 297.967 287.683 301C287.683 303.186 286.681 305.138 285.111 306.422C285.404 307.394 285.725 308.354 286.074 309.3C304.171 310.458 318.56 323.698 319.359 340.117C323.695 341.344 328.271 342 333 342H812.683C829.252 342 842.683 328.569 842.683 312V30C842.683 13.4315 829.252 0 812.683 0H333C328.271 0 323.695 0.656515 319.359 1.88337C318.56 18.3019 304.171 31.5417 286.074 32.7Z" fill="url(#paint0_linear_5_83)"/>
<g id="Vector">
<path d="M566.981 114L559.294 136.071H552.687L545 114H550.619L555.99 130.663L561.393 114H566.981Z" fill="#166634"/>
<path d="M573.975 145C572.566 145 571.304 144.767 570.188 144.301C569.072 143.836 568.176 143.146 567.499 142.233C566.84 141.32 566.493 140.221 566.456 138.936H571.45C571.523 139.662 571.77 140.221 572.191 140.612C572.612 140.985 573.161 141.171 573.838 141.171C574.533 141.171 575.082 141.013 575.484 140.696C575.887 140.361 576.088 139.904 576.088 139.327C576.088 138.842 575.923 138.442 575.594 138.125C575.283 137.808 574.89 137.548 574.414 137.343C573.957 137.138 573.298 136.905 572.438 136.644C571.194 136.253 570.179 135.861 569.392 135.47C568.606 135.079 567.929 134.501 567.362 133.737C566.794 132.974 566.511 131.977 566.511 130.747C566.511 128.921 567.16 127.496 568.459 126.471C569.758 125.428 571.45 124.906 573.536 124.906C575.658 124.906 577.369 125.428 578.667 126.471C579.966 127.496 580.662 128.931 580.753 130.775H575.676C575.64 130.142 575.411 129.648 574.99 129.294C574.57 128.921 574.03 128.735 573.371 128.735C572.804 128.735 572.347 128.893 571.999 129.21C571.652 129.508 571.478 129.946 571.478 130.524C571.478 131.157 571.77 131.651 572.356 132.005C572.941 132.359 573.856 132.741 575.1 133.151C576.344 133.579 577.35 133.989 578.119 134.38C578.905 134.771 579.582 135.34 580.149 136.085C580.716 136.83 581 137.79 581 138.963C581 140.081 580.716 141.097 580.149 142.01C579.6 142.923 578.796 143.649 577.734 144.19C576.673 144.73 575.42 145 573.975 145Z" fill="#166634"/>
</g>
<path id="Subtract_2" fill-rule="evenodd" clip-rule="evenodd" d="M249.844 0H30C13.4315 0 0 13.4315 0 30V312C0 328.569 13.4314 342 30 342H249.844C249.842 341.853 249.841 341.705 249.841 341.557C249.841 323.844 265.65 309.458 285.251 309.221V305.996C285.168 305.999 285.084 306 285 306C281.134 306 278 302.866 278 299C278 295.134 281.134 292 285 292C285.084 292 285.168 292.001 285.251 292.004V280.996C285.168 280.999 285.084 281 285 281C281.134 281 278 277.866 278 274C278 270.134 281.134 267 285 267C285.084 267 285.168 267.001 285.251 267.004V255.996C285.168 255.999 285.084 256 285 256C281.134 256 278 252.866 278 249C278 245.134 281.134 242 285 242C285.084 242 285.168 242.001 285.251 242.004V230.996C285.168 230.999 285.084 231 285 231C281.134 231 278 227.866 278 224C278 220.134 281.134 217 285 217C285.045 217 285.09 217 285.135 217.001C285.174 217.002 285.213 217.003 285.251 217.004V205.996C285.204 205.997 285.156 205.998 285.108 205.999C285.072 206 285.036 206 285 206C281.134 206 278 202.866 278 199C278 195.134 281.134 192 285 192C285.084 192 285.168 192.001 285.251 192.004V180.996C285.168 180.999 285.084 181 285 181C281.134 181 278 177.866 278 174C278 170.134 281.134 167 285 167C285.04 167 285.08 167 285.12 167.001C285.154 167.002 285.189 167.002 285.223 167.003L285.251 167.004V155.996L285.207 155.997C285.167 155.998 285.127 155.999 285.086 155.999C285.058 156 285.029 156 285 156C281.134 156 278 152.866 278 149C278 145.134 281.134 142 285 142C285.084 142 285.168 142.001 285.251 142.004V130.996C285.168 130.999 285.084 131 285 131C281.134 131 278 127.866 278 124C278 120.134 281.134 117 285 117C285.084 117 285.168 117.001 285.251 117.004V105.996C285.211 105.997 285.171 105.998 285.13 105.999L285.103 105.999L285.061 106L285 106C281.134 106 278 102.866 278 99C278 95.134 281.134 92 285 92C285.038 92 285.076 92.0003 285.114 92.0009L285.175 92.0022C285.201 92.0028 285.226 92.0035 285.251 92.0044V80.9956C285.209 80.9971 285.166 80.9982 285.124 80.9989C285.083 80.9996 285.041 81 285 81C281.134 81 278 77.866 278 74C278 70.134 281.134 67 285 67C285.084 67 285.168 67.0015 285.251 67.0044V55.9956C285.168 55.9985 285.084 56 285 56C281.134 56 278 52.866 278 49C278 45.134 281.134 42 285 42C285.084 42 285.168 42.0015 285.251 42.0044V32.7794C265.65 32.5424 249.841 18.1557 249.841 0.443006C249.841 0.295103 249.842 0.147433 249.844 0Z" fill="#FEF286"/>
<rect id="qr-code" x="68" y="88" width="166" height="166" fill="url(#pattern1)"/>
<text id="qrcode-string" transform="matrix(0 -1 1 0 53 213)" fill="black" xml:space="preserve" style="white-space: pre" font-family="Code 8x8" font-size="8" letter-spacing="0.03em"><tspan x="0" y="9">${option.qrcodestr}</tspan></text>
<g id="Group 4">
<path id="Rectangle 3" d="M376.074 38.6695L378.474 38.2409L368.4 54.3302L366 54.7589L376.074 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 4" d="M382.636 38.6695L385.036 38.2409L374.962 54.3302L372.562 54.7589L382.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 5" d="M389.636 38.6695L392.036 38.2409L381.962 54.3302L379.562 54.7589L389.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 6" d="M396.636 38.6695L399.036 38.2409L388.962 54.3302L386.562 54.7589L396.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 7" d="M403.636 38.6695L406.036 38.2409L395.962 54.3302L393.562 54.7589L403.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 8" d="M410.636 38.6695L413.036 38.2409L402.962 54.3302L400.562 54.7589L410.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 9" d="M417.636 38.6695L420.036 38.2409L409.962 54.3302L407.562 54.7589L417.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 10" d="M424.636 38.6695L427.036 38.2409L416.962 54.3302L414.562 54.7589L424.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 11" d="M431.636 38.6695L434.036 38.2409L423.962 54.3302L421.562 54.7589L431.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 12" d="M438.636 38.6695L441.036 38.2409L430.962 54.3302L428.562 54.7589L438.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 13" d="M445.636 38.6695L448.036 38.2409L437.962 54.3302L435.562 54.7589L445.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 14" d="M452.636 38.6695L455.036 38.2409L444.962 54.3302L442.562 54.7589L452.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 15" d="M459.636 38.6695L462.036 38.2409L451.962 54.3302L449.562 54.7589L459.636 38.6695Z" fill="#BABD74"/>
<path id="Rectangle 45" d="M669.636 38.6695L672.036 38.2409L661.962 54.3302L659.562 54.7589L669.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 46" d="M676.636 38.6695L679.036 38.2409L668.962 54.3302L666.562 54.7589L676.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 47" d="M683.636 38.6695L686.036 38.2409L675.962 54.3302L673.562 54.7589L683.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 48" d="M690.636 38.6695L693.036 38.2409L682.962 54.3302L680.562 54.7589L690.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 49" d="M697.636 38.6695L700.036 38.2409L689.962 54.3302L687.562 54.7589L697.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 50" d="M704.636 38.6695L707.036 38.2409L696.962 54.3302L694.562 54.7589L704.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 51" d="M711.636 38.6695L714.036 38.2409L703.962 54.3302L701.562 54.7589L711.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 52" d="M718.636 38.6695L721.036 38.2409L710.962 54.3302L708.562 54.7589L718.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 53" d="M725.636 38.6695L728.036 38.2409L717.962 54.3302L715.562 54.7589L725.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 54" d="M732.636 38.6695L735.036 38.2409L724.962 54.3302L722.562 54.7589L732.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 55" d="M739.636 38.6695L742.036 38.2409L731.962 54.3302L729.562 54.7589L739.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 56" d="M746.636 38.6695L749.036 38.2409L738.962 54.3302L736.562 54.7589L746.636 38.6695Z" fill="#80AB6D"/>
<path id="Rectangle 57" d="M753.636 38.6695L756.036 38.2409L745.962 54.3302L743.562 54.7589L753.636 38.6695Z" fill="#80AB6D"/>
</g>
<g id="STADIUM TICKET">
<text fill="#166634" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="20" font-weight="800" letter-spacing="0.03em"><tspan x="473" y="54">STADIUM </tspan></text>
<text fill="#0CA345" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="20" font-weight="800" letter-spacing="0.03em"><tspan x="574.988" y="54">TICKET</tspan></text>
</g>
<g id="Group 15">
<g id="Group 6">
<circle id="Ellipse 21" cx="468.639" cy="122.639" r="48.6387" fill="#0CA345" fill-opacity="0.3"/>
<rect id="team1-logo" x="429.728" y="83.7277" width="77.8219" height="77.8219" fill="url(#pattern2)"/>
</g>
<g id="Group 5">
<circle id="Ellipse 22" cx="657.916" cy="122.639" r="48.6387" fill="#0CA345" fill-opacity="0.3"/>
<rect id="team2-logo" x="619.005" y="83.7277" width="77.8219" height="77.8219" fill="url(#pattern3)"/>
</g>
</g>
<path id="Rectangle 58" d="M411 190.477C411 187.725 413.225 185.49 415.977 185.477L511.782 185.04C515.644 185.022 518.067 189.203 516.132 192.545L510.944 201.505C510.05 203.049 508.401 204 506.617 204H416C413.239 204 411 201.761 411 199V190.477Z" fill="#52B76A"/>
<path id="Rectangle 59" d="M709.5 190.477C709.5 187.725 707.275 185.49 704.523 185.477L608.718 185.04C604.856 185.022 602.433 189.203 604.368 192.545L609.556 201.505C610.45 203.049 612.099 204 613.883 204H704.5C707.261 204 709.5 201.761 709.5 199V190.477Z" fill="#52B76A"/>
<text id="team1-name" fill="#EEEEEE" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="14" font-weight="bold" letter-spacing="0.1em"><tspan x="451" y="199.4">${option.ticket.game.team1.name}</tspan></text>
<text id="team2-name" fill="#EEEEEE" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="14" font-weight="bold" letter-spacing="0.1em"><tspan x="639" y="199.4">${option.ticket.game.team2.name}</tspan></text>
<g id="Group 7">
<line id="Line 1" x1="336" y1="242" x2="469" y2="242" stroke="#B1BF75" stroke-width="2" stroke-linecap="round"/>
<line id="Line 2" x1="656" y1="242" x2="789" y2="242" stroke="#63A56E" stroke-width="2" stroke-linecap="round"/>
</g>
<text id="AIT AHMED STADIUM" fill="#166634" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="16" font-weight="bold" letter-spacing="0.05em"><tspan x="474" y="248.6">AIT AHMED STADIUM</tspan></text>
<g id="Group 14">
<g id="Group 12">
<text id="BLEACHER" fill="#4D8B64" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="16" letter-spacing="0.02em"><tspan x="584" y="309.6">BLEACHER</tspan></text>
<text id="bleacherType" fill="#166634" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="20" font-weight="bold" letter-spacing="0.05em"><tspan x="584" y="292">${option.ticket.seat.bleacherType}</tspan></text>
</g>
<g id="Group 11">
<text id="SEAT" fill="#4D8B64" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="16" letter-spacing="0.02em"><tspan x="724" y="309.6">SEAT</tspan></text>
<text id="seatCode" fill="#166634" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="20" font-weight="bold" letter-spacing="0.05em"><tspan x="724" y="292">${option.ticket.seat.code}</tspan></text>
</g>
<line id="Line 3" x1="700" y1="267" x2="700" y2="322" stroke="#44A368" stroke-opacity="0.6" stroke-width="2"/>
<g id="Group 16">
<rect id="Rectangle 60" x="333" y="266" width="460" height="56" rx="9" stroke="#0CA345" stroke-opacity="0.6" stroke-width="2"/>
<path id="Rectangle 61" d="M334 275C334 270.582 337.582 267 342 267H561V321H342C337.582 321 334 317.418 334 313V275Z" fill="#0CA345" fill-opacity="0.6"/>
</g>
<g id="Group 13">
<text id="date" fill="#EEEEEE" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="16" letter-spacing="0.05em"><tspan x="347" y="310.6">June, Sunday 8 2022</tspan></text>
<text id="time" fill="#EEEEEE" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="20" font-weight="bold" letter-spacing="0.05em"><tspan x="347" y="293">17:00 PM</tspan></text>
</g>
</g>
</g>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_5_83" transform="matrix(0.000357143 0 0 0.000584464 0 -0.0844643)"/>
</pattern>
<pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image1_5_83" transform="matrix(0.00205205 0 0 0.00206737 -0.103704 -0.11194)"/>
</pattern>
<pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image2_5_83" transform="scale(0.00104167)"/>
</pattern>
<pattern id="pattern3" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image3_5_83" transform="scale(0.000488281)"/>
</pattern>
<linearGradient id="paint0_linear_5_83" x1="276.683" y1="273" x2="716.183" y2="522" gradientUnits="userSpaceOnUse">
<stop stop-color="#FEF286"/>
<stop offset="0.244792" stop-color="#FEF286" stop-opacity="0.6"/>
<stop offset="1" stop-color="#0CA345" stop-opacity="0.33"/>
</linearGradient>
<image href="${path.join(__dirname + '/../images/templates/ticket_bg.png')}" id="image0_5_83"  width="2800" height="2000" />
<image href="${option.qrcodeImage}" id="image1_5_83"  width="592" height="592"/>
<image href="${path.join(__dirname + '/../' + option.ticket.game.team1.logo)}" id="image2_5_83"  width="960" height="960"/>
<image href="${path.join(__dirname + '/../' + option.ticket.game.team2.logo)}" id="image3_5_83"  width="2048" height="2048" />
</defs>
</svg>
`

	// background color
	doc
		.save()
		.moveTo(0, 0)
		.lineTo(1000, 0)
		.lineTo(1000, 2000)
		.lineTo(0,2000)
		.fill('#222')
	
	
	// add svg
	SVGtoPDF(doc, svg, 0,0)
	
	// end buffering
	doc.end()
}


module.exports = buildPDF
