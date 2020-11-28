let withAuthProvider = (Component) => {
  let mapStateToProps = (state) => ({
    isLoggedIn: state.editor.isLoggedIn
  });

  return connect(mapStateToProps)(Component);
};