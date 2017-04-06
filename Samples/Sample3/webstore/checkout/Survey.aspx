<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Shop.Survey" Title="Untitled Page" Codebehind="Survey.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
   <div id="Survey" data-replace="Survey">
	   <div data-el="surveyConfirmationLabel">
			<asp:Literal ID="SurveyConfirmationLiteral" runat="server" Visible="false" />
		</div>

        <asp:PlaceHolder ID="SurveyPlaceHolder" runat="server">
		    <asp:GridView ID="SurveyGridView" runat="server" AutoGenerateColumns="false" ShowHeader="false" 
			    DataKeyNames="SurveyFieldID" ShowFooter="false" GridLines="None" OnRowDataBound="SurveyGridView_RowDataBound">
			    <Columns>
				    <%--<asp:BoundField DataField="FieldLabel"/>--%>
					<asp:TemplateField>
						<ItemTemplate>
							<span data-table-shift="surveyQuestions">
							<span data-text="surveyQuestionLabel">
								<asp:Label ID="Label1" runat="server" Text='<%# Bind("FieldLabel") %>'></asp:Label>
							</span>
						</ItemTemplate>
					</asp:TemplateField>
				    <asp:TemplateField>
					    <ItemTemplate>
						    <span data-html="surveyResponsePh">
								<asp:PlaceHolder ID="SurveyResponsePlaceHolder" runat="server" />
							</span>
					    </ItemTemplate>
				    </asp:TemplateField>
				    <asp:TemplateField>
					    <ItemTemplate>
						    <span data-html="surveyValidatorPh">
								<asp:PlaceHolder ID="SurveyRequiredFieldValidatorPlaceHolder" runat="server" />
							</span>
					    </ItemTemplate>
				    </asp:TemplateField>
			    </Columns>
		    </asp:GridView>
			<span data-el="saveButton">
				<asp:Button id="SaveButton" runat="server" OnClick="SaveButton_OnClick" />
			</span>
	    </asp:PlaceHolder>
	    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/survey.html") %>
	</div>
</asp:Content>