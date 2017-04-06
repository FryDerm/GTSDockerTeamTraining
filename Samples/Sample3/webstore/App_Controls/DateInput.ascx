<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DateInput.ascx.cs" Inherits="Gateway.Web.UI.Controls.DateInput" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>

<cc1:NumericTextBox ID="DateInput1" runat="server" />&nbsp;/&nbsp;
<cc1:NumericTextBox ID="DateInput2" runat="server" />&nbsp;/&nbsp;
<cc1:NumericTextBox ID="DateInput3" runat="server" />
<asp:CustomValidator ID="Validator" runat="server" ControlToValidate="" ErrorMessage="* invalid date" Display="Dynamic" EnableClientScript="false" OnServerValidate="Validator_ServerValidate" Enabled="false" />
<cc1:TextBoxWatermarkExtender ID="DayTextBoxWatermark" runat="server" WatermarkCssClass="DayWatermark" WatermarkText="dd" />
<cc1:TextBoxWatermarkExtender ID="MonthTextBoxWatermark" runat="server" WatermarkCssClass="MonthWatermark" WatermarkText="mm"  />
<cc1:TextBoxWatermarkExtender ID="YearTextBoxWatermark" runat="server" WatermarkCssClass="YearWatermark" WatermarkText="yyyy" />