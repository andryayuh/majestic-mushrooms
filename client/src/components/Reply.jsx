import React from 'react';
import { Icon, Table, Segment, Label, Form, TextArea, Divider, Button, Container, Input, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createReply } from './utils/messagesHelper.js';


class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false, 
      deleted: false,
      sent: false
    };
  }

  handleSubmit(e) {
    const { message } = this.props;
    const reply = createReply(e.target, message);

    axios.post('/api/messages', reply)
    .then(response => { 
      console.log('Sent back from Nylas after sending reply: ', response); 
    })
    .catch(err => { console.log('Error after posting a reply message to Nylas'); });

    this.setState({sent: true, expand: false});
  }

  deleteDraft(e) {
    e.stopPropagation();
    this.setState({ expand: false, deleted: true });       
  }

  render() {
    const { message } = this.props;

    return (
      <Table.Cell colSpan='3' onClick={() => { this.setState({ expand: true, deleted: false }); }}>

        {!this.state.expand ? (
          this.state.deleted ? (
            <Form warning>
              <Message
                warning style={{fontWeight: 'bold'}}
                content="Message discarded."
              />
              <TextArea name="emailContentInputField" placeholder="Click here to Reply" rows="3" value=''/>  
            </Form>  
            ) 
          : this.state.sent ? (
              <Form success>
                <Message
                  success style={{fontWeight: 'bold'}}
                  content="Message sent."
                />
                <TextArea name="emailContentInputField" placeholder="Click here to Reply" rows="3" value=''/>  
              </Form>  
            ) : (
              <Form>
                <TextArea name="emailContentInputField" placeholder="Click here to Reply" rows="3" value=''/>  
              </Form>  
            )
        ) : (
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Container>
                <Label color='blue' horizontal>To </Label> 
                <Input name="toInputField" transparent={true} className="emailFields" defaultValue={message.from[0].email} />
                <Divider />
              </Container> 
              <TextArea name="emailContentInputField" autoHeight placeholder="Click here to Reply" rows="7" />
              <Divider hidden />
    
              <Container textAlign="right">
                <Icon size="large" name="trash outline" onClick={(e) => { this.deleteDraft(e); }}/>
                <Button primary>Send</Button>
              </Container>
            </Form>
        )}
      </Table.Cell>
    );
  }
}
    
export default Reply;