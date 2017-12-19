import React, {Component} from 'react';
import { Input,Button, Tree } from 'antd';
import ReactDOM from 'react-dom';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const dataList = [];
const getRoles = [{
    title: '标准',
    key: '1',
    children: [{
      title: '宾客', key: '6',
    }],
  }, {
    title: '分销',
    key: '2',
    children: [{
      title: '雪中飞一级', key: '7',
    }],
  }, {
    title: '仓储',
    key: '3',
    children: [{
      title: '仓库管理', key: '8',
    }],
  }, {
    title: '全渠道',
    key: '4',
    children: [{
      title: '门卫大叔', key: '9',
    }],
  }]

class ButtonSize extends Component {
    constructor() {  
        super();  
        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
        };  

    }  


    getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
          const node = tree[i];
          if (node.children) {
            if (node.children.some(item => item.key === key)) {
              parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
              parentKey = getParentKey(key, node.children);
            }
          }
        }
        return parentKey;
      };
      


    renderTreeNodes = (data) => {
        return data.map((item) => {
          if (item.children) {
              console.log(item.children)
            return (
              <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          else{
            <TreeNode title={item.title} key={item.key} dataRef={item} />
          }
          {/* return <TreeNode {...item} />; */}
        });
      }

      onChange = (e) => {
        const value = e.target.value;
        const expandedKeys = dataList.map((item) => {
          if (item.key.indexOf(value) > -1) {
            return getParentKey(item.key, gData);
          }
          return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
          expandedKeys,
          searchValue: value,
          autoExpandParent: true,
        });
      }

    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const loop = data => data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title = index > -1 ? (
              <span>
                {beforeStr}
                <span style={{ color: '#f50' }}>{searchValue}</span>
                {afterStr}
              </span>
            ) : <span>{item.title}</span>;
            if (item.children) {
              return (
                <TreeNode key={item.key} title={title}>
                  {loop(item.children)}
                </TreeNode>
              );
            }
            return <TreeNode key={item.key} title={title} />;
          });
    
        return(
            <div>
                <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                <Tree
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                >
                {loop(getRoles)}
                </Tree>
            </div>
          
        )
    }
}

export default ButtonSize;



