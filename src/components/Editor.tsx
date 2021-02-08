import styled from 'styled-components'

const EditorRoot = styled.div`
  position: relative;

  width: 100%;

  min-height: 400px;

  border-radius: 8px;

  overflow: hidden;

  background: white;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);

  margin-bottom: 24px;
`

const Textarea = styled.textarea`
  width: 100%;
  height: calc(100% - 32px);

  border: none;
  outline: none;
  resize: none;

  padding: 1rem;

  ::placeholder {
    color: rgba(0, 0, 0, 0.8);
  }
`

const TextCountRoot = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;

  height: 32px;

  text-align: right;

  padding-right: 8px;

  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.4);
`

const TextCount: React.FC<{ value: string; maxLength: number }> = (props) => {
  return (
    <>
      <TextCountRoot>
        {props.value.length} / {props.maxLength}
      </TextCountRoot>
    </>
  )
}

/**
 * EditorProps type.
 */
export type EditorProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxLength: number
}

/**
 * Editor component.
 */
export const Editor: React.FC<EditorProps> = (props) => {
  return (
    <>
      <EditorRoot>
        <Textarea {...props}></Textarea>
        <TextCount value={props.value as string} maxLength={props.maxLength} />
      </EditorRoot>
    </>
  )
}
