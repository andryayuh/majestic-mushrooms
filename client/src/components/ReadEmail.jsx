import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Message, Divider, Table, Icon, Label, Image } from 'semantic-ui-react';
import axios from 'axios';
import ReadMailEntry from './ReadMailEntry.jsx';
import Reply from './Reply.jsx';
import { queryMessageDetails } from './utils/messagesHelper.js';

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]; 
var currentColor = -1;


class ReadEmail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { currentMessage, setThread } = this.props;
    var messageId = currentMessage.message_id;
    var threadId = currentMessage.thread_id;
    axios.get(`api/threads/${threadId}`)
    .then(response => {
      setThread(response.data);
    })
    .catch(error => {
      console.log('getThreads error: ', error);
    });
  }

  handleMessageClick() {
    // placeholder for thread click
  }

  handleCloseClick() {
    // this.setState({redirect: true});    
  }

  handleMessageClick() {

  }
  
  handleArrowClick(arrowDirection) {
    
    const newMessageIndex = this.props.currentMessage.messageIndex + arrowDirection;
    const { messages, setCurrentMessage } = this.props;
    queryMessageDetails(messages[newMessageIndex].message_id, newMessageIndex, messages[newMessageIndex].unread, setCurrentMessage );

  }

  createMarkup() {
    const { currentMessage } = this.props;
    return {__html: currentMessage.body};
  }

  render() {
    
    const { currentMessage, thread, messages } = this.props;

    return (
      
        <div>
          <Divider hidden />
          {thread.length === 0 ? (
            <Image src='https://s-media-cache-ak0.pinimg.com/originals/d9/93/3c/d9933c4e2c272f33b74ef18cdf11a7d5.gif' centered size='small'/>
          ) : (
            <Table fixed>
              <Table.Header>
                <Table.Row height="100px">
                  <Table.HeaderCell colSpan='2' style={{wordWrap: 'normal'}}>
                  <h2>{currentMessage.subject}</h2>
                  </Table.HeaderCell>


                  <Table.HeaderCell colSpan='1' textAlign='right'> 
                    {currentMessage.messageIndex > 0 ? <Icon name="chevron left" onClick={this.handleArrowClick.bind(this, -1)}/> : null}
                    {currentMessage.messageIndex < messages.length ? <Icon name="chevron right" onClick={this.handleArrowClick.bind(this, 1)}/> : null}
                      <Icon name="remove" onClick={this.handleCloseClick.bind(this)}/>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {<ReadMailEntry message={thread[0]} messageId={thread[0].message_id} />}
                <Table.Row>
                  <Table.Cell colSpan='3'>
                    <div dangerouslySetInnerHTML={this.createMarkup()} ></div>
                  </Table.Cell>
                </Table.Row>
                  {thread.slice(1, thread.length).map((message, index) => {
                    currentColor++;
                    if (currentColor > thread.length) { currentColor = -1; }
                    return <ReadMailEntry key={index} message={message} messageId={message.message_id} 
                  onClick={this.handleMessageClick.bind(this)} />;
                  })}
              <Table.Row>
                <Reply message={thread[0]}/>
              </Table.Row>
            </Table.Body> 
          </Table>
        )}
      </div>
    );
  }
}

export default ReadEmail;