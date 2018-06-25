let codePattern = `
    var child = require('child_process');
    var islocal = false;
    var xhhlintPath = '';
    try {
        islocal = child.execSync('xhhlint islocal', {
            encoding: 'utf-8'
        }).trim() === 'true';
        if (!islocal) {
            xhhlintPath = child.execSync('xhhlint where', {
                encoding: 'utf-8'
            }).trim() + '/node_modules/';
        }
    } catch(e) {
    }
    var ap = islocal ? '' : xhhlintPath;
    module.exports = <%content%>
`;

let localCodePattern = 'module.exports = <%content%>';

module.exports = (content, islocal) => {
  return islocal ? localCodePattern.replace(/<%content%>/g, content) : codePattern.replace(/<%content%>/g, content).replace(/"<%path%>/g, 'ap+"');
};