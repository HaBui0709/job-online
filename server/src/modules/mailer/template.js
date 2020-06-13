import { format, helper } from '../../utils';

/**
 * Send email to admin when new campaign manual created
 *
 */
const recuitermentCreatedNotify = (data = {}, options) => {
  const link = `https://v3-admin.zody.vn/#/campaign-manuals/${data.campaign._id}`
  options.html = `
    Chiến dịch <strong>${data.campaign.name}</strong> của ${data.target.name} (${data.campaign.formality}) vừa được tạo, vui lòng click vào
    <a href="${link}" style="font-weight: bold">đây</a>
    để duyệt.
  `

  options.subject = 'Job Online - New recuiterment created'
  return options
}

/**
 *
 * Send email notification
 *
 * @param {Object} data
 * @param {Object} options
 *
 */
const sendNotification = (data = [], options) => {
  options.html = `
  <div>
  <table bgcolor="#CCC" style="margin-top:10px;font-family:'Helvetica',san-serif;color:#444" width="100%">
      <tbody>
          <tr>
              <td>
                  <table align="center" bgcolor="white" cellpadding="0" cellspacing="0" style="margin:auto;border-radius:7px;width:100%;max-width:550px;">
                      <tbody>
                          <tr bgcolor="#0091cf">
                              <td style="padding:12px 25px;border-radius:7px 7px 0px 0px">
                                  <a href="http://localhost:4202/home">
                                      <img alt="M-JobOnline" border="0" src="https://zodyapp-dev.s3.amazonaws.com/202989725567_1558966635967.png" style="float:left" width="105px" class="CToWUd">
                                  </a>
                                  <div style="float:right;color:#fff;margin-top:8px;font-size:18px">
                                      Người thật việc thật
                                  </div>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding:35px 20px 0px 20px">
                                  <table style="font-size:15px" width="100%">
                                      <tbody>
                                          <tr>
                                              <td style="color:#fc205b;font-size:20px;font-weight:bold">
                                                  Xin chào Ha Bui,
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding:10px 25px 0;color:#fff">
                                  <div style="background-color:rgb(64,64,64);padding:12px;font-size:13px;margin-bottom:24px">
                                      <p><b>Quyền lợi của ứng viên</b></p>
                                      <ul>
                                          <li>
                                              <p>Sở hữu hồ sơ tìm việc hoàn toàn miễn phí</p>
                                          </li>
                                          <li>
                                              <p>Nhận bản&nbsp;tin việc làm từ các nhà tuyển dụng đã&nbsp;xác thực bởi <span class="il">M Job Online<span></p>
                                      </li>
                                  </ul>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td style="padding:10px 20px 0">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                  <tbody>
                                      <tr>
                                          <td>
                                              <div style="border-top:2px solid #f3f3f3"></div>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="color:#5b5b5c;padding-top:15px;padding:10px 5px" width="98%">
                                              <span class="il">MyWork</span>&nbsp;xin giới thiệu đến bạn những vị trí hàng đầu đang tuyển:
                              </td>
                          </tr>`

  for (const item of data) {
    options.html += `
                            <tr bgcolor="white" height="90">
                            <td style="padding:10px 5px">
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td width="18%">
                                                <a href="/fff"> <img width="90%" src="${item.cover}" class="CToWUd"></a>
                                            </td>
                                            <td width="82%">
                                                <table style="table-layout:fixed" width="100%">
                                                    <tbody>
                                                        <tr style="font-size:15px">
                                                            <td width="80%">
                                                                <a style="text-decoration:none;color:#0091cf" href="https://tracking.mywork.com.vn/auto-email/clicks/8n33z2T356EniNEsQU5RB7ZfqxJUD7TCLCX9dLBTOho/fkCwDHJ9f89amx0CTaE763eQ/odJa892UpZYyndY5FxT1OcYRkCctEunomKp7sAIsFcL4hMLUTw892O89253892v44Qa9WNEbwEM1EwRqtPT8yqBlddjW6JCUTRtBph892Mz5SCVuiK6NHLJ3OX3Xud4pqYyj7INfjq164MIYQ4xIKbxDD892LpRYJ892Gtm34d2qACDe5m8O0REtr1DJhRB4892E0bZqLlv2hjny/29836e474e69c88f1da6e4fc5c975372" title="Chi tiết Nhân Viên Marketing" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://tracking.mywork.com.vn/auto-email/clicks/8n33z2T356EniNEsQU5RB7ZfqxJUD7TCLCX9dLBTOho/fkCwDHJ9f89amx0CTaE763eQ/odJa892UpZYyndY5FxT1OcYRkCctEunomKp7sAIsFcL4hMLUTw892O89253892v44Qa9WNEbwEM1EwRqtPT8yqBlddjW6JCUTRtBph892Mz5SCVuiK6NHLJ3OX3Xud4pqYyj7INfjq164MIYQ4xIKbxDD892LpRYJ892Gtm34d2qACDe5m8O0REtr1DJhRB4892E0bZqLlv2hjny/29836e474e69c88f1da6e4fc5c975372&amp;source=gmail&amp;ust=1558951331950000&amp;usg=AFQjCNEHo0lKImfSzFMD4aA3Jk6ZiyRksw">
                                                                    <b>${item.title}</b></a>
                                                            </td>
                                                            <td width="20%">
                                                                <span style="background:#ff9800;padding:8px;font-size:12px;border-radius:3px">
                                                                <a style="display:inline-block;text-decoration:none;color:#fff" href="https://tracking.mywork.com.vn/auto-email/clicks/8n33z2T356EniNEsQU5RB7ZfqxJUD7TCLCX9dLBTOho/fkCwDHJ9f89amx0CTaE763eQ/odJa892UpZYyndY5FxT1OcYRkCctEunomKp7sAIsFcL4hMLUTw892O89253892v44Qa9WNEbwEM1EwRqtPT8yqBlddjW6JCUTRtBph892Mz5SCVuiK6NHLJ3OX3Xud4pqYyj7INfjq164MIYQ4xIKbxDD892LpRYJ892Gtm34d2qACDe5m8O0REtr1DJhRB4892E0bZqLlv2hjny/29836e474e69c88f1da6e4fc5c975372" title="Ứng tuyển Nhân Viên Marketing" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://tracking.mywork.com.vn/auto-email/clicks/8n33z2T356EniNEsQU5RB7ZfqxJUD7TCLCX9dLBTOho/fkCwDHJ9f89amx0CTaE763eQ/odJa892UpZYyndY5FxT1OcYRkCctEunomKp7sAIsFcL4hMLUTw892O89253892v44Qa9WNEbwEM1EwRqtPT8yqBlddjW6JCUTRtBph892Mz5SCVuiK6NHLJ3OX3Xud4pqYyj7INfjq164MIYQ4xIKbxDD892LpRYJ892Gtm34d2qACDe5m8O0REtr1DJhRB4892E0bZqLlv2hjny/29836e474e69c88f1da6e4fc5c975372&amp;source=gmail&amp;ust=1558951331950000&amp;usg=AFQjCNEHo0lKImfSzFMD4aA3Jk6ZiyRksw">
                                                                    Xem chi tiết</a>
                                                            </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size:13px;color:#5c5c5c">
                                                                Công Ty Cổ Phần Đào Tạo Công Nghệ Hiệu Quả - Chương Trình Fast Track Se
                                                            </td>
                                                            <td style="font-size:13px;color:#5c5c5c;padding-left:12px">

                                                            </td>
                                                        </tr>
                                                        <tr style="font-size:13px">
                                                            <td style="color:#fc205b">
                                                                Thương lượng
                                                            </td>
                                                            <td style="padding-left:12px" valign="top">
                                                                Đà Nẵng
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                              <td>
                                  <div style="border-top:2px solid #f3f3f3"></div>
                              </td>
                          </tr>
                            `
  }
  options.html += `
                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 25px;font-family:Arial,sans-serif;color:#999999;text-align:center;font-size:13px;font-style:italic">
                                        <div style="background:#f3f3f3;padding:10px">Đây là email tự động, vui lòng không trả lời email này.</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <img
                            src="https://ci5.googleusercontent.com/proxy/rulsoug7qwdhfqYm9cttE86qt-SpfgeuZnJCUEA8t3ERvo6745_GdAHYlFeoB9E4rd-pu6lSSzHZXWN8ifgmWxSQrOWvIJTJ_juzyW1BnTTNfgEX-wMhz0VN582LUQGTI6A7kjnkkboXve546JEaAc2dYvR4dMLFcZVlRQ_rugAolkJl_sPy6blKLMB246ADGs0WzIbHll10g2QdGOlp8y0RteRJ-RuhiNSpkyaN7RfktJ52Yl5LcvJZ8qXfnWo=s0-d-e1-ft#https://tracking.mywork.com.vn/auto-email/open/8n33z2T356EniNEsQU5RB7ZfqxJUD7TCLCX9dLBTOho/fkCwDHJ9f89amx0CTaE763eQ/BuVahFaRj79c8EY1mtafbw/29836e474e69c88f1da6e4fc5c975372" alt="" style="width:1px;height:1px" class="CToWUd">
                        <div class="yj6qo"></div>
                        <div class="adL">
                        </div>
                        </div>
                        </body>
                            `
  options.subject = 'Job Online - New jobs'
  return options
}


/**
     *
     * Send email to recuiter when new apply job created
     *
     * @param {Object} data
     * @param {Object} options
     *
     */
const applyJobCreatedNotify = (data = {}, options) => {
  const link = `http://localhost:4202/recuiter/apply-jobs/${data.recuiterment._id}`
  options.html = `
  <div>
        <table bgcolor="#CCC" style="margin-top:10px;font-family:'Helvetica',san-serif;color:#444" width="100%">
            <tbody>
                <tr>
                    <td>
                        <table align="center" bgcolor="white" cellpadding="0" cellspacing="0" style="margin:auto;border-radius:7px;width:100%;max-width:550px;">
                            <tbody>
                                <tr bgcolor="#0091cf">
                                    <td style="padding:12px 25px;border-radius:7px 7px 0px 0px">
                                        <a href="http://localhost:4202/home">
                                            <img alt="M-JobOnline" border="0" src="https://zodyapp-dev.s3.amazonaws.com/202989725567_1558966635967.png" style="float:left" width="105px" class="CToWUd">
                                        </a>
                                        <div style="float:right;color:#fff;margin-top:8px;font-size:18px">
                                            Người thật việc thật
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:35px 20px 0px 20px">
                                        <table style="font-size:15px" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td style="color:#fc205b;font-size:20px;font-weight:bold">
                                                        Xin chào ${data.recuiter},
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            <tr>
                                <td style="padding:10px 20px 0">
                                    <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div style="border-top:2px solid #f3f3f3"></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="color:#5b5b5c;padding-top:15px;padding:10px 5px" width="98%">
                                                    Có một hồ sơ ứng tuyển vào tin tuyển dụng: <br /><b><i>${data.recuiterment.title}</i></b>  của bạn:
                                    </td>
                                </tr>
                                <tr bgcolor="white" height="90">
                                    <td style="padding:10px 5px">
                                        <table width="100%">
                                            <tbody>
                                                <tr>
                                                    <td width="18%">
                                                        <a href="/abc" class="CToWUd">
                                                        <img width="90%" src="${data.candidate.user.avatar}" />
                                                        </a>
                                                    </td>
                                                    <td width="82%">
                                                        <table style="table-layout:fixed" width="100%">
                                                            <tbody>
                                                                <tr style="font-size:15px">
                                                                    <td width="80%">
                                                                        <a style="text-decoration:none;color:#0091cf" href="/user">
                                                                            <b>${data.candidate.user.fullName}</b></a>
                                                                    </td>
                                                                    <td width="20%">
                                                                        <span style="background:#ff9800;padding:8px;font-size:12px;border-radius:3px">
                                                                        <a style="display:inline-block;text-decoration:none;color:#fff" href="${link}">
                                                                            Xem chi  tiết</a>
                                                                    </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="font-size:13px;color:#5c5c5c">
                                                                       ${data.candidate.overviewInfo.desiredLocation}
                                                                    </td>
                                                                    <td style="font-size:13px;color:#5c5c5c;padding-left:12px">

                                                                    </td>
                                                                </tr>
                                                                <tr style="font-size:13px">
                                                                    <td style="color:#fc205b">
                                                                        Mức lương mong muốn tối thiểu:  ${format.number(data.candidate.overviewInfo.minimumWage)}
                                                                    </td>
                                                                    <td style="padding-left:12px" valign="top">
                                                                        ${helper.getCity(data.candidate.overviewInfo.desiredCity)}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="border-top:2px solid #f3f3f3"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding:0 25px;font-family:Arial,sans-serif;color:#999999;text-align:center;font-size:13px;font-style:italic">
                        <div style="background:#f3f3f3;padding:10px">Đây là email tự động, vui lòng không trả lời email này.</div>
                    </td>
                </tr>
            </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>

        <img src="https://ci5.googleusercontent.com/proxy/rulsoug7qwdhfqYm9cttE86qt-SpfgeuZnJCUEA8t3ERvo6745_GdAHYlFeoB9E4rd-pu6lSSzHZXWN8ifgmWxSQrOWvIJTJ_juzyW1BnTTNfgEX-wMhz0VN582LUQGTI6A7kjnkkboXve546JEaAc2dYvR4dMLFcZVlRQ_rugAolkJl_sPy6blKLMB246ADGs0WzIbHll10g2QdGOlp8y0RteRJ-RuhiNSpkyaN7RfktJ52Yl5LcvJZ8qXfnWo=s0-d-e1-ft#https://tracking.mywork.com.vn/auto-email/open/8n33z2T356EniNEsQU5RB7ZfqxJUD7TCLCX9dLBTOho/fkCwDHJ9f89amx0CTaE763eQ/BuVahFaRj79c8EY1mtafbw/29836e474e69c88f1da6e4fc5c975372" alt="" style="width:1px;height:1px" class="CToWUd">
        <div class="yj6qo"></div>
        <div class="adL">
        </div>
        </div>
  `
  options.subject = 'Job Online - New applyJob created'
  return options
}

/**
     *
     * Send email when approved apply job
     *
     * @param {Object} data
     * @param {Object} options
     *
     */
const approvedApplyjobNotify = (data = {}, options) => {
  options.html = `
  <div>
        <table bgcolor="#CCC" style="margin-top:10px;font-family:'Helvetica',san-serif;color:#444" width="100%">
            <tbody>
                <tr>
                    <td>
                        <table align="center" bgcolor="white" cellpadding="0" cellspacing="0" style="margin:auto;border-radius:7px;width:100%;max-width:550px;">
                            <tbody>
                                <tr bgcolor="#0091cf">
                                    <td style="padding:12px 25px;border-radius:7px 7px 0px 0px">
                                        <a href="http://localhost:4202/home">
                                            <img alt="M-JobOnline" border="0" src="https://zodyapp-dev.s3.amazonaws.com/202989725567_1558966635967.png" style="float:left" width="105px" class="CToWUd">
                                        </a>
                                        <div style="float:right;color:#fff;margin-top:8px;font-size:18px">
                                            Người thật việc thật
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:35px 20px 0px 20px">
                                        <table style="font-size:15px" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td style="color:#fc205b;font-size:20px;font-weight:bold">
                                                        Xin chào ${data.cv.user.fullName},
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            <tr>
                                <td style="padding:10px 20px 0">
                                    <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div style="border-top:2px solid #f3f3f3"></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="color:#5b5b5c;padding-top:15px;padding:10px 5px" width="98%"><b><i>Tin tuyển dụng: ${data.recuitermentData.title}</i></b><br /><br />
                                                   ${data.notification.message}<br />
                                    </td>
                                </tr>
                       
                                <tr>
                                    <td>
                                        <div style="border-top:2px solid #f3f3f3"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

            </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <div class="yj6qo"></div>
        <div class="adL">
        </div>
        </div>
  `

  options.subject = `${data.notification.title}`
  return options
}

export default {
  recuitermentCreatedNotify,
  applyJobCreatedNotify,
  sendNotification,
  approvedApplyjobNotify,
}
