class CommentsController < ApplicationController
  before_action :set_group

  def index
    @message = Comment.new
    @messages = @group.comments.includes(:user)
  end

  def create
    @message = @group.comments.new(message_params)
    if @message.save
      respond_to do |format|
        format.json
      end
    else
      @messages = @group.comments.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:comment).permit(:message, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end


end
