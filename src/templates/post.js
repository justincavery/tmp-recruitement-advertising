import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import {safePrefix, htmlToReact} from '../utils';

export default class Post extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
            <div className="outer">
              <div className="inner-medium">
                <article className="post post-full">
                  <header className="post-header">
                    <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                  </header>
                  {_.get(this.props, 'pageContext.frontmatter.img_path') && 
                  <div className="post-thumbnail">
                    <img src={safePrefix(_.get(this.props, 'pageContext.frontmatter.img_path'))} alt={_.get(this.props, 'pageContext.frontmatter.title')} />
                  </div>
                  }
                  {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                  <div className="post-subtitle">
                    {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                  </div>
                  }
                  <div className="post-content">
                    {htmlToReact(_.get(this.props, 'pageContext.html'))}
                  </div>
                  <footer className="post-meta">
                    <time className="published"
                      dateTime={moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%A, %B %e, %Y')}</time>
                  </footer>
                </article>
              </div>
            </div>
            </Layout>
        );
    }
}




import {htmlToReact, getPages, Link, safePrefix} from '../utils';

export default class SectionPosts extends React.Component {
    render() {
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
        let recent_posts = display_posts.slice(0, 3);
        return (
            <section id={_.get(this.props, 'section.section_id')} className={'block posts-block bg-' + _.get(this.props, 'section.bg') + ' outer'}>
              <div className="block-header inner-small">
                {_.get(this.props, 'section.title') && 
                <h2 className="block-title">{_.get(this.props, 'section.title')}</h2>
                }
                {_.get(this.props, 'section.subtitle') && 
                <p className="block-subtitle">
                  {htmlToReact(_.get(this.props, 'section.subtitle'))}
                </p>
                }
              </div>
              <div className="inner">
                <div className="post-feed">
                  {_.map(recent_posts, (post, post_idx) => (
                  <article key={post_idx} className="post post-card">
                    <div className="post-card-inside">
                      {_.get(post, 'frontmatter.thumb_img_path') && 
                      <Link className="post-card-thumbnail" to={safePrefix(_.get(post, 'url'))}>
                        <img className="thumbnail" src={safePrefix(_.get(post, 'frontmatter.thumb_img_path'))} alt={_.get(post, 'frontmatter.title')} />
                      </Link>
                      }
                      <div className="post-card-content">
                        <header className="post-header">
                          <h3 className="post-title"><Link to={safePrefix(_.get(post, 'url'))} rel="bookmark">{_.get(post, 'frontmatter.title')}</Link></h3>
                        </header>
                        <div className="post-excerpt">
                          <p>{_.get(post, 'frontmatter.excerpt')}</p>
                        </div>
                        <footer className="post-meta">
                          <time className="published"
                            dateTime={moment(_.get(post, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date')).strftime('%B %d, %Y')}</time>
                        </footer>
                      </div>
                    </div>
                  </article>
                  ))}
                </div>
              </div>
            </section>
        );
    }
}
